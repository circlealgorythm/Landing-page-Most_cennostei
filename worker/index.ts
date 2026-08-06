/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
  YANDEX_SMTP_LOGIN?: string;
  YANDEX_SMTP_APP_PASSWORD?: string;
  FUNNELHUB_APPLICATION_URL?: string;
  FUNNELHUB_APPLICATION_TOKEN?: string;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/application") {
      return handleApplication(request, env);
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;

const recipient = "aisukam-info@yandex.ru";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function handleApplication(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers: { allow: "POST" } });
  if (!env.YANDEX_SMTP_LOGIN || !env.YANDEX_SMTP_APP_PASSWORD) {
    return Response.json({ error: "Mail is not configured" }, { status: 503 });
  }

  let values: { name?: unknown; phone?: unknown; email?: unknown };
  try { values = await request.json(); } catch { return Response.json({ error: "Invalid request" }, { status: 400 }); }
  const name = typeof values.name === "string" ? values.name.trim() : "";
  const phone = typeof values.phone === "string" ? values.phone.trim() : "";
  const email = typeof values.email === "string" ? values.email.trim() : "";
  const phoneDigits = phone.replace(/\D/g, "");
  if (name.length < 2 || phoneDigits.length < 10 || phoneDigits.length > 15 || !emailPattern.test(email)) {
    return Response.json({ error: "Invalid application data" }, { status: 400 });
  }

  try {
    await sendApplicationToInbox(env, name, phone, email);
    await sendMail(env.YANDEX_SMTP_LOGIN, env.YANDEX_SMTP_APP_PASSWORD, name, phone, email);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Unable to send application" }, { status: 502 });
  }
}

async function sendApplicationToInbox(env: Env, name: string, phone: string, email: string) {
  if (!env.FUNNELHUB_APPLICATION_URL || !env.FUNNELHUB_APPLICATION_TOKEN) {
    throw new Error("Inbox application integration is not configured");
  }
  const response = await fetch(env.FUNNELHUB_APPLICATION_URL, {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.FUNNELHUB_APPLICATION_TOKEN}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ name, phone, email }),
  });
  if (!response.ok) throw new Error(`Inbox application integration failed: ${response.status}`);
}

async function sendMail(login: string, password: string, name: string, phone: string, email: string) {
  const { connect } = await import("cloudflare:sockets");
  const socket = connect({ hostname: "smtp.yandex.ru", port: 465, secureTransport: "on" });
  const reader = socket.readable.getReader();
  const writer = socket.writable.getWriter();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  const readResponse = async () => {
    while (!/(?:^|\r?\n)\d{3} /.test(buffer)) {
      const { value, done } = await reader.read();
      if (done) throw new Error("SMTP connection closed");
      buffer += decoder.decode(value, { stream: true });
    }
    const match = buffer.match(/\r?\n(\d{3}) [^\n]*\r?\n?$/) ?? buffer.match(/^(\d{3}) [^\n]*/);
    const code = Number(match?.[1]);
    buffer = "";
    if (code < 200 || code >= 400) throw new Error(`SMTP error ${code}`);
  };
  const command = async (value: string) => { await writer.write(encoder.encode(`${value}\r\n`)); await readResponse(); };
  const base64 = (value: string) => btoa(unescape(encodeURIComponent(value)));
  const clean = (value: string) => value.replace(/[\r\n]/g, " ");
  const subject = "[Мост ценностей] Новая заявка";
  const body = `Имя: ${clean(name)}\r\nТелефон: ${clean(phone)}\r\nEmail: ${clean(email)}`;

  try {
    await readResponse();
    await command("EHLO most-tsennostey.ru");
    await command("AUTH LOGIN");
    await command(base64(login));
    await command(base64(password));
    await command(`MAIL FROM:<${login}>`);
    await command(`RCPT TO:<${recipient}>`);
    await command("DATA");
    await command(`From: ${login}\r\nTo: ${recipient}\r\nReply-To: ${email}\r\nSubject: =?UTF-8?B?${base64(subject)}?=\r\nX-Lead-Source: most-tsennostey\r\nX-Lead-Form: application\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n${body}\r\n.`);
    await command("QUIT");
  } finally {
    writer.releaseLock();
    reader.releaseLock();
    socket.close();
  }
}
