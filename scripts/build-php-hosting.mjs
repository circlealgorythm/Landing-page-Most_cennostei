import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "php-hosting", "public");
const flatOutput = path.join(root, "php-hosting", "deploy-root");
const client = path.join(root, "dist", "client");
const template = path.join(root, "php-hosting", "template-public");
const rootTemplate = path.join(root, "php-hosting", "template-root");
const workerModule = pathToFileURL(path.join(root, "dist", "server", "index.js")).href;
const { default: worker } = await import(`${workerModule}?php-export=${Date.now()}`);

const sharedStyles = `\n<link rel="stylesheet" href="/assets/php-hosting.css">\n<script defer src="/assets/php-form.js"></script>`;
const fontStyles = `\n<style data-php-fonts>@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Golos+Text:wght@400;500;600;700&display=swap'); :root{--font-cormorant:'Cormorant Garamond',Georgia,serif;--font-golos:'Golos Text',Arial,sans-serif}</style>`;

async function render(route) {
  const response = await worker.fetch(new Request(`http://localhost${route}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  if (!response.ok) throw new Error(`Could not render ${route}`);
  let html = await response.text();
  html = html.replace(/<style data-vinext-fonts>[\s\S]*?<\/style>/, fontStyles);
  html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/g, "");
  html = html.replace(/<link rel="modulepreload"[^>]*>/g, "");
  html = html.replaceAll("https://vnutrennyaya-opora.circlealgorythm.chatgpt.site", "https://most.aisukam.ru");
  return html.replace("</head>", `${sharedStyles}</head>`);
}

const formScript = `(() => {
  const dialog = document.createElement('div');
  dialog.className = 'dialog-backdrop';
  dialog.hidden = true;
  dialog.innerHTML = '<section class="application-dialog" role="dialog" aria-modal="true" aria-labelledby="application-dialog-title"><button class="dialog-close" type="button" aria-label="Закрыть форму">×</button><p class="eyebrow">Мост ценностей · Москва · 3–5 сентября 2026</p><h2 id="application-dialog-title">Оставьте <em>заявку.</em></h2><p class="dialog-lead">Мы свяжемся с вами, спокойно обсудим, подходит ли вам этот тренинг, и расскажем детали.</p><form class="dialog-form" novalidate><div class="field"><label for="form-name">Имя</label><input id="form-name" name="name" autocomplete="name" placeholder="Как к вам обращаться"></div><div class="field"><label for="form-phone">Телефон</label><input id="form-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="+7 999 123-45-67"></div><div class="field"><label for="form-email">Email</label><input id="form-email" name="email" type="email" autocomplete="email" inputmode="email" placeholder="you@example.com"></div><p class="form-error" hidden role="alert"></p><button class="button primary form-submit" type="submit">Отправить заявку <span class="arrow-icon" aria-hidden="true"></span></button><p class="form-consent">Нажимая «Отправить заявку», вы соглашаетесь на обработку данных для связи по вашей заявке.</p></form></section>';
  document.body.append(dialog);
  const form = dialog.querySelector('form'); const error = dialog.querySelector('.form-error');
  const close = () => { dialog.hidden = true; document.body.classList.remove('dialog-open'); };
  document.querySelectorAll('.application-trigger').forEach((button) => button.addEventListener('click', () => { dialog.hidden = false; document.body.classList.add('dialog-open'); dialog.querySelector('#form-name').focus(); }));
  dialog.addEventListener('click', (event) => { if (event.target === dialog || event.target.closest('.dialog-close')) close(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !dialog.hidden) close(); });
  form.addEventListener('submit', async (event) => { event.preventDefault(); const data = Object.fromEntries(new FormData(form)); const phoneDigits = String(data.phone).replace(/\\D/g, ''); const message = String(data.name).trim().length < 2 ? 'Укажите имя — не менее 2 символов.' : phoneDigits.length < 10 || phoneDigits.length > 15 ? 'Укажите телефон в международном формате.' : !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(String(data.email).trim()) ? 'Проверьте адрес электронной почты.' : ''; if (message) { error.textContent = message; error.hidden = false; return; } error.hidden = true; const submit = form.querySelector('button[type=submit]'); submit.disabled = true; submit.textContent = 'Отправляем…'; try { const response = await fetch('/api/application/', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) }); if (!response.ok) throw new Error(); location.assign('/posle-zayavki/'); } catch { error.textContent = 'Заявку пока не удалось отправить. Попробуйте ещё раз или напишите нам на aisukam-info@yandex.ru.'; error.hidden = false; submit.disabled = false; submit.innerHTML = 'Отправить заявку <span class="arrow-icon" aria-hidden="true"></span>'; } });
})();`;

void formScript;

const productionFormScript = `(() => {
  const dialog = document.createElement('div');
  dialog.className = 'dialog-backdrop';
  dialog.hidden = true;
  dialog.innerHTML = '<section class="application-dialog" role="dialog" aria-modal="true" aria-labelledby="application-dialog-title"><button class="dialog-close" type="button" aria-label="Закрыть форму">×</button><p class="eyebrow">Мост ценностей · Москва · 3–5 сентября 2026</p><h2 id="application-dialog-title">Оставьте <em>заявку.</em></h2><p class="dialog-lead">Мы свяжемся с вами, спокойно обсудим, подходит ли вам этот тренинг, и расскажем детали.</p><form class="dialog-form" novalidate><div class="field"><label for="form-name">Имя</label><input id="form-name" name="name" autocomplete="name" placeholder="Как к вам обращаться"></div><div class="field"><label for="form-phone">Телефон</label><input id="form-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="+7 999 123-45-67"></div><div class="field"><label for="form-email">Email</label><input id="form-email" name="email" type="email" autocomplete="email" inputmode="email" placeholder="you@example.com"></div><p class="form-error" hidden role="alert"></p><button class="button primary form-submit" type="submit">Отправить заявку <span class="arrow-icon" aria-hidden="true"></span></button><p class="form-consent">Нажимая «Отправить заявку», вы соглашаетесь на обработку данных для связи по вашей заявке.</p></form></section>';
  document.body.append(dialog);
  const form = dialog.querySelector('form');
  const error = dialog.querySelector('.form-error');
  let closeTimer;
  const keepAccordionStartInView = (accordion) => { const initialTop = accordion.getBoundingClientRect().top; const startedAt = performance.now(); const lock = (now) => { const shift = accordion.getBoundingClientRect().top - initialTop; if (Math.abs(shift) > .5) window.scrollBy(0, shift); if (now - startedAt < 390) requestAnimationFrame(lock); }; requestAnimationFrame(lock); };
  const open = () => { clearTimeout(closeTimer); dialog.hidden = false; document.body.classList.add('dialog-open'); requestAnimationFrame(() => { dialog.classList.add('is-open'); dialog.querySelector('#form-name').focus(); }); };
  const close = () => { dialog.classList.remove('is-open'); document.body.classList.remove('dialog-open'); clearTimeout(closeTimer); closeTimer = setTimeout(() => { dialog.hidden = true; }, 320); };
  document.querySelectorAll('.application-trigger').forEach((button) => button.addEventListener('click', open));
  dialog.querySelector('.dialog-close').addEventListener('click', close);
  document.querySelectorAll('.aisu-biography-trigger').forEach((button) => button.addEventListener('click', () => { const accordion = button.closest('.aisu-biography'); keepAccordionStartInView(accordion); const isOpen = accordion.classList.toggle('is-open'); button.setAttribute('aria-expanded', String(isOpen)); }));
  form.addEventListener('submit', async (event) => { event.preventDefault(); const data = Object.fromEntries(new FormData(form)); const phoneDigits = String(data.phone).replace(/\\D/g, ''); const message = String(data.name).trim().length < 2 ? 'Укажите имя — не менее 2 символов.' : phoneDigits.length < 10 || phoneDigits.length > 15 ? 'Укажите телефон в международном формате.' : !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(String(data.email).trim()) ? 'Проверьте адрес электронной почты.' : ''; if (message) { error.textContent = message; error.hidden = false; return; } error.hidden = true; const submit = form.querySelector('button[type=submit]'); submit.disabled = true; submit.textContent = 'Отправляем…'; try { const response = await fetch('/api/application/', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) }); if (!response.ok) throw new Error(); location.assign('/posle-zayavki/'); } catch { error.textContent = 'Заявку пока не удалось отправить. Попробуйте ещё раз или напишите нам на aisukam-info@yandex.ru.'; error.hidden = false; submit.disabled = false; submit.innerHTML = 'Отправить заявку <span class="arrow-icon" aria-hidden="true"></span>'; } });
})();`;

const afterApplicationScript = `(() => {
  if (!/^\\/posle-zayavki\\/?$/.test(location.pathname)) return;
  const prefix = 'most_tsennostey_telegram_url=';
  const cookie = document.cookie.split('; ').find((item) => item.startsWith(prefix));
  if (!cookie) return;
  document.cookie = 'most_tsennostey_telegram_url=; Max-Age=0; path=/; Secure; SameSite=Lax';
  let telegramUrl = '';
  try { telegramUrl = decodeURIComponent(cookie.slice(prefix.length)); } catch { return; }
  try {
    const parsed = new URL(telegramUrl);
    if (parsed.protocol !== 'https:' || parsed.hostname !== 't.me') return;
  } catch { return; }
  const option = document.querySelector('.bot-options .bot-option');
  if (!(option instanceof HTMLElement)) return;
  const link = document.createElement('a');
  link.className = option.className;
  link.href = telegramUrl;
  link.innerHTML = '<span class="bot-kind">Telegram</span><strong>Открыть Telegram-бота</strong><p>Нажмите «Начать», чтобы получить материалы.</p>';
  option.replaceWith(link);
})();`;

const phpStyles = `.dialog-backdrop[hidden]{display:none}.dialog-backdrop{position:fixed!important;z-index:100;inset:0;padding:24px;display:grid;place-items:center;background:rgba(6,24,17,.64);backdrop-filter:blur(8px)}.application-dialog{width:min(100%,580px);max-height:min(800px,calc(100dvh - 48px));padding:clamp(30px,5vw,50px);overflow-y:auto;position:relative;color:var(--deep);background:var(--surface);border:1px solid rgba(232,198,119,.52);border-radius:20px;box-shadow:0 32px 100px rgba(0,0,0,.3)}.application-dialog h2{margin:9px 0 0;font-size:clamp(46px,8vw,66px)}.dialog-close{width:38px;height:38px;display:grid;place-items:center;position:absolute;top:17px;right:17px;color:var(--deep);background:transparent;border:1px solid var(--line-strong);border-radius:50%;cursor:pointer;font-size:28px;line-height:1}.dialog-lead{max-width:430px;margin:20px 0 28px;color:var(--muted);font-size:15px;line-height:1.65}.dialog-form,.field{display:grid;gap:17px}.field{gap:7px}.field label{color:var(--deep);font-size:13px;font-weight:700}.field input{width:100%;min-height:52px;padding:13px 15px;color:var(--deep);background:var(--white);border:1px solid var(--line-strong);border-radius:9px;font:inherit;font-size:16px}.field input:focus{outline:2px solid var(--amber);outline-offset:2px}.form-error{margin:0;padding:10px 12px;color:#9d3d2e;background:#f7e4df;border-radius:8px;font-size:12px}.form-submit{width:100%;margin-top:4px;cursor:pointer}.form-submit:disabled{opacity:.68;cursor:wait}.form-consent{margin:0;color:#6b786f;font-size:11px;line-height:1.5}@media(max-width:720px){.dialog-backdrop{padding:12px;align-items:end}.application-dialog{max-height:calc(100dvh - 24px);padding:32px 22px 25px;border-radius:16px}.application-dialog h2{font-size:49px}}`;
const phpMotionStyles = `.dialog-backdrop{opacity:0;pointer-events:none;backdrop-filter:blur(0);transition:opacity 300ms var(--ease-out),backdrop-filter 300ms var(--ease-out)}.dialog-backdrop.is-open{opacity:1;pointer-events:auto;backdrop-filter:blur(8px)}.application-dialog{opacity:0;transform:translateY(18px) scale(.975);transition:opacity 260ms var(--ease-out),transform 320ms var(--ease-out)}.dialog-backdrop.is-open .application-dialog{opacity:1;transform:translateY(0) scale(1)}`;

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(client, output, { recursive: true });
await cp(template, output, { recursive: true });
await writeFile(path.join(output, 'index.html'), await render('/'));
await mkdir(path.join(output, 'posle-zayavki'), { recursive: true });
await writeFile(path.join(output, 'posle-zayavki', 'index.html'), await render('/posle-zayavki'));
await mkdir(path.join(output, 'zapis'), { recursive: true });
await writeFile(path.join(output, 'zapis', 'index.html'), await render('/zapis'));
await mkdir(path.join(output, 'assets'), { recursive: true });
await writeFile(path.join(output, 'assets', 'php-form.js'), productionFormScript + afterApplicationScript);
await writeFile(path.join(output, 'assets', 'php-hosting.css'), phpStyles + phpMotionStyles);

await rm(flatOutput, { recursive: true, force: true });
await cp(output, flatOutput, { recursive: true });
await cp(rootTemplate, flatOutput, { recursive: true });
await cp(path.join(root, 'php-hosting', 'composer.json'), path.join(flatOutput, 'composer.json'));
await cp(path.join(root, 'php-hosting', 'config.example.php'), path.join(flatOutput, 'config.example.php'));
console.log(`PHP hosting packages created in ${output} and ${flatOutput}`);
