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

const sharedStyles = `\n<link rel="stylesheet" href="/assets/php-hosting.css">\n<script defer src="/assets/php-form.js?v=20260806-vk"></script>`;
const fontTags = `\n<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Golos+Text:wght@400;500;600;700&display=swap">\n<style data-php-fonts>:root{--font-cormorant:'Cormorant Garamond',Georgia,serif;--font-golos:'Golos Text',Arial,sans-serif}</style>`;

async function render(route) {
  const response = await worker.fetch(new Request(`http://localhost${route}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  if (!response.ok) throw new Error(`Could not render ${route}`);
  let html = await response.text();
  html = html.replace(/<style data-vinext-fonts>[\s\S]*?<\/style>/, fontTags);
  html = html.replace(/<script(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/g, "");
  html = html.replace(/<link rel="modulepreload"[^>]*>/g, "");
  html = html.replace(/<link rel="preload" [^>]*logo\.jpg[^>]*>/g, "");
  html = html.replaceAll("https://vnutrennyaya-opora.circlealgorythm.chatgpt.site", "https://most.aisukam.ru");
  if (!html.includes('rel="canonical"')) {
    const canonicalUrl = `https://most.aisukam.ru${route === '/' ? '/' : route}`;
    html = html.replace("</head>", `<link rel="canonical" href="${canonicalUrl}">\n</head>`);
  }
  return html.replace("</head>", `${sharedStyles}</head>`);
}

const formScript = `(() => {
  const dialog = document.createElement('div');
  dialog.className = 'dialog-backdrop';
  dialog.hidden = true;
  dialog.innerHTML = '<section class="application-dialog" role="dialog" aria-modal="true" aria-labelledby="application-dialog-title"><button class="dialog-close" type="button" aria-label="Закрыть форму">×</button><p class="eyebrow">Мост ценностей · Москва · 3–5 сентября 2026</p><h2 id="application-dialog-title">Оставьте <em>заявку.</em></h2><p class="dialog-lead">Мы свяжемся с вами, спокойно обсудим, подходит ли вам этот тренинг, и расскажем детали.</p><form class="dialog-form" novalidate><div class="field"><label for="form-name">Имя</label><input id="form-name" name="name" autocomplete="name" placeholder="Как к вам обращаться"></div><div class="field"><label for="form-phone">Телефон</label><input id="form-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="+7 999 123-45-67"></div><div class="field"><label for="form-email">Email</label><input id="form-email" name="email" type="email" autocomplete="email" inputmode="email" placeholder="you@example.com"></div><p class="form-error" hidden role="alert"></p><button class="button primary form-submit" type="submit">Отправить заявку <span class="arrow-icon" aria-hidden="true"></span></button><p class="form-consent">Оставляя заявку, вы соглашаетесь на обработку данных в соответствии с политикой конфиденциальности, а также с договором офертой на оказание услуг</p></form></section>';
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
  const dialog = document.createElement('dialog');
  dialog.className = 'application-dialog';
  dialog.id = 'application-dialog';
  dialog.setAttribute('aria-labelledby', 'application-dialog-title');
  dialog.innerHTML = '<button class="dialog-close" type="button" aria-label="Закрыть форму">×</button>' +
    '<p class="eyebrow">Мост ценностей · Москва · 3–5 сентября 2026</p>' +
    '<h2 id="application-dialog-title">Оставьте <em>заявку.</em></h2>' +
    '<p class="dialog-lead">Мы свяжемся с вами, спокойно обсудим, подходит ли вам этот тренинг, и расскажем детали.</p>' +
    '<form class="dialog-form" novalidate>' +
      '<div class="field">' +
        '<label for="form-name">Имя</label>' +
        '<input id="form-name" name="name" type="text" autocomplete="name" placeholder="Как к вам обращаться" required minlength="2">' +
        '<p class="field-error" id="form-name-error" hidden role="alert"></p>' +
      '</div>' +
      '<div class="field">' +
        '<label for="form-phone">Телефон</label>' +
        '<input id="form-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="+7 (999) 123-45-67" required>' +
        '<p class="field-error" id="form-phone-error" hidden role="alert"></p>' +
      '</div>' +
      '<div class="field">' +
        '<label for="form-email">Email</label>' +
        '<input id="form-email" name="email" type="email" autocomplete="email" inputmode="email" placeholder="you@example.com" required>' +
        '<p class="field-error" id="form-email-error" hidden role="alert"></p>' +
      '</div>' +
      '<p class="form-error" hidden role="alert"></p>' +
      '<button class="button primary form-submit" type="submit">Отправить заявку <span class="arrow-icon" aria-hidden="true"></span></button>' +
      '<p class="form-consent">Оставляя заявку, вы соглашаетесь на обработку данных в соответствии с политикой конфиденциальности, а также с договором офертой на оказание услуг</p>' +
    '</form>';
  document.body.append(dialog);

  const form = dialog.querySelector('form');
  const nameInput = form.querySelector('#form-name');
  const phoneInput = form.querySelector('#form-phone');
  const emailInput = form.querySelector('#form-email');
  const nameErr = form.querySelector('#form-name-error');
  const phoneErr = form.querySelector('#form-phone-error');
  const emailErr = form.querySelector('#form-email-error');
  const globalError = form.querySelector('.form-error');

  const formatPhone = (val) => {
    const digits = val.replace(/\\D/g, '');
    if (!digits) return '';
    let body = (digits.startsWith('7') || digits.startsWith('8')) ? digits.slice(1) : digits;
    let res = '+7';
    if (body.length > 0) res += ' (' + body.slice(0, 3);
    if (body.length >= 3) res += ') ' + body.slice(3, 6);
    if (body.length >= 6) res += '-' + body.slice(6, 8);
    if (body.length >= 8) res += '-' + body.slice(8, 10);
    return res;
  };

  phoneInput.addEventListener('input', () => {
    phoneInput.value = formatPhone(phoneInput.value);
  });

  const setFieldError = (input, errEl, msg) => {
    if (msg) {
      errEl.textContent = msg;
      errEl.hidden = false;
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', errEl.id);
    } else {
      errEl.textContent = '';
      errEl.hidden = true;
      input.removeAttribute('aria-invalid');
    }
  };

  const validateField = (field) => {
    if (field === 'name') {
      const val = nameInput.value.trim();
      const msg = val.length < 2 ? 'Укажите имя — не менее 2 символов.' : '';
      setFieldError(nameInput, nameErr, msg);
      return !msg;
    }
    if (field === 'phone') {
      const digits = phoneInput.value.replace(/\\D/g, '');
      const msg = digits.length < 10 || digits.length > 15 ? 'Укажите телефон в формате +7 (999) 123-45-67.' : '';
      setFieldError(phoneInput, phoneErr, msg);
      return !msg;
    }
    if (field === 'email') {
      const val = emailInput.value.trim();
      const msg = !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(val) ? 'Проверьте адрес электронной почты.' : '';
      setFieldError(emailInput, emailErr, msg);
      return !msg;
    }
    return true;
  };

  nameInput.addEventListener('blur', () => validateField('name'));
  phoneInput.addEventListener('blur', () => validateField('phone'));
  emailInput.addEventListener('blur', () => validateField('email'));

  nameInput.addEventListener('input', () => { if (nameInput.hasAttribute('aria-invalid')) validateField('name'); });
  phoneInput.addEventListener('input', () => { if (phoneInput.hasAttribute('aria-invalid')) validateField('phone'); });
  emailInput.addEventListener('input', () => { if (emailInput.hasAttribute('aria-invalid')) validateField('email'); });

  const open = () => {
    dialog.showModal();
    document.body.classList.add('dialog-open');
    requestAnimationFrame(() => {
      dialog.classList.add('is-open');
      nameInput.focus();
    });
  };

  const close = () => {
    dialog.classList.remove('is-open');
    document.body.classList.remove('dialog-open');
    setTimeout(() => { if (dialog.open) dialog.close(); }, 240);
  };

  document.querySelectorAll('.application-trigger').forEach((btn) => btn.addEventListener('click', open));
  dialog.querySelector('.dialog-close').addEventListener('click', close);

  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX && event.clientX <= rect.left + rect.width
    );
    if (!isInDialog) close();
  });

  dialog.addEventListener('cancel', () => {
    document.body.classList.remove('dialog-open');
  });

  document.querySelectorAll('.aisu-biography-trigger').forEach((button) => button.addEventListener('click', () => {
    const accordion = button.closest('.aisu-biography');
    const isOpen = accordion.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(isOpen));
  }));

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const vName = validateField('name');
    const vPhone = validateField('phone');
    const vEmail = validateField('email');
    if (!vName || !vPhone || !vEmail) {
      if (!vName) nameInput.focus();
      else if (!vPhone) phoneInput.focus();
      else emailInput.focus();
      return;
    }
    globalError.hidden = true;
    const submitBtn = form.querySelector('button[type=submit]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправляем…';
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch('/api/application/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error();
      location.assign('/posle-zayavki/');
    } catch {
      globalError.textContent = 'Заявку пока не удалось отправить. Попробуйте ещё раз или напишите нам на aisukam-info@yandex.ru.';
      globalError.hidden = false;
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Отправить заявку <span class="arrow-icon" aria-hidden="true"></span>';
    }
  });
})();`;

const afterApplicationScript = `(() => {
  if (!/^\\/posle-zayavki\\/?$/.test(location.pathname)) return;
  const readSafeCookieUrl = (name, host) => {
    const prefix = name + '=';
    const cookie = document.cookie.split('; ').find((item) => item.startsWith(prefix));
    if (!cookie) return '';
    document.cookie = name + '=; Max-Age=0; path=/; Secure; SameSite=Lax';
    try {
      const url = decodeURIComponent(cookie.slice(prefix.length));
      const parsed = new URL(url);
      return parsed.protocol === 'https:' && parsed.hostname === host ? url : '';
    } catch { return ''; }
  };
  const replaceOption = (index, url, kind, title, description) => {
    if (!url) return;
    const option = document.querySelectorAll('.bot-options .bot-option')[index];
    if (!(option instanceof HTMLElement)) return;
    const link = document.createElement('a');
    link.className = option.className;
    link.href = url;
    link.innerHTML = '<span class="bot-kind">' + kind + '</span><strong>' + title + '</strong><p>' + description + '</p>';
    option.replaceWith(link);
  };
  replaceOption(0, readSafeCookieUrl('most_tsennostey_telegram_url', 't.me'), 'Telegram', 'Открыть Telegram-бота', 'Нажмите «Начать», чтобы получить материалы.');
  replaceOption(1, readSafeCookieUrl('most_tsennostey_vk_url', 'vk.me'), 'VK', 'Открыть VK-бота', 'Разрешите сообщения от сообщества, чтобы получить материалы.');
})();`;

const phpStyles = `.dialog-open{overflow:hidden}dialog.application-dialog{width:min(100%,580px);max-height:min(820px,calc(100dvh - 48px));padding:clamp(30px,5vw,50px);margin:auto;position:fixed;inset:0;overflow-y:auto;color:var(--deep);background:var(--surface);border:1px solid rgba(232,198,119,.52);border-radius:20px;box-shadow:0 32px 100px rgba(0,0,0,.35);outline:none;opacity:0;transform:translateY(18px) scale(.975);transition:opacity 240ms var(--ease-out),transform 280ms var(--ease-out)}dialog.application-dialog[open]{display:block}dialog.application-dialog.is-open{opacity:1;transform:translateY(0) scale(1)}dialog.application-dialog::backdrop{background:rgba(6,24,17,.65);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);opacity:0;transition:opacity 240ms var(--ease-out)}dialog.application-dialog.is-open::backdrop{opacity:1}.application-dialog h2{margin:9px 0 0;font-size:clamp(46px,8vw,66px)}.dialog-close{width:38px;height:38px;display:grid;place-items:center;position:absolute;top:17px;right:17px;color:var(--deep);background:transparent;border:1px solid var(--line-strong);border-radius:50%;cursor:pointer;font-size:28px;line-height:1;transition:background 150ms var(--ease-out),transform 150ms var(--ease-out)}.dialog-close:hover{background:rgba(21,58,43,.08);transform:scale(1.05)}.dialog-lead{max-width:430px;margin:20px 0 28px;color:var(--muted);font-size:15px;line-height:1.65}.dialog-form,.field{display:grid;gap:17px}.field{gap:6px}.field label{color:var(--deep);font-size:13px;font-weight:700}.field input{width:100%;min-height:52px;padding:13px 15px;color:var(--deep);background:var(--white);border:1px solid var(--line-strong);border-radius:9px;font:inherit;font-size:16px;outline:none;transition:border-color 150ms var(--ease-out),box-shadow 150ms var(--ease-out),background-color 150ms var(--ease-out)}.field input::placeholder{color:#849087;opacity:1}.field input:focus{border-color:var(--amber);box-shadow:0 0 0 3px rgba(197,138,34,.14)}.field input[aria-invalid="true"],.field input:user-invalid{border-color:#a24432;background:#fffaf9}.field input:user-valid:not(:placeholder-shown){border-color:rgba(23,67,51,.45)}.field-error{margin:2px 0 0;color:#9d3d2e;font-size:12px;line-height:1.35}.field-error[hidden]{display:none}.form-error{margin:0;padding:10px 12px;color:#9d3d2e;background:#f7e4df;border-radius:8px;font-size:12px;line-height:1.4}.form-error[hidden]{display:none}.form-submit{width:100%;margin-top:4px;cursor:pointer}.form-submit:disabled{cursor:wait;opacity:.68}.form-consent{margin:0;color:#6b786f;font-size:11px;line-height:1.5}@media(max-width:720px){dialog.application-dialog{max-height:calc(100dvh - 24px);padding:32px 22px 25px;border-radius:16px;margin-bottom:0}.application-dialog h2{font-size:49px}}`;
const phpMotionStyles = ``;

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
