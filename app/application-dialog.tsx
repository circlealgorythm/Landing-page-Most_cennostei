"use client";

import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type FormValues = { name: string; phone: string; email: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;
const initialValues: FormValues = { name: "", phone: "", email: "" };

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) errors.name = "Укажите имя — не менее 2 символов.";
  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) errors.phone = "Укажите телефон в международном формате.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "Проверьте адрес электронной почты.";
  return errors;
}

export function ApplicationDialog({ className, children, title }: { className: string; children: ReactNode; title?: string }) {
  const [isRendered, setIsRendered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeButton.current?.focus();
    document.body.classList.add("dialog-open");
    return () => { document.body.classList.remove("dialog-open"); };
  }, [isOpen]);

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  function openDialog() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsRendered(true);
    requestAnimationFrame(() => setIsOpen(true));
  }

  function closeDialog() {
    setIsOpen(false);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setIsRendered(false), 320);
  }

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setServerError("");
    if (Object.keys(nextErrors).length) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/application", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(values) });
      if (!response.ok) throw new Error();
      const payload: unknown = await response.json();
      const telegramUrl = payload && typeof payload === "object" ? (payload as { telegramUrl?: unknown }).telegramUrl : null;
      if (typeof telegramUrl !== "string") throw new Error();
      const parsedUrl = new URL(telegramUrl);
      if (parsedUrl.protocol !== "https:" || parsedUrl.hostname !== "t.me") throw new Error();
      window.sessionStorage.setItem("most-tsennostey-telegram-url", telegramUrl);
      window.location.assign("/posle-zayavki");
    } catch {
      setServerError("Заявку пока не удалось отправить. Попробуйте ещё раз или напишите нам на aisukam-info@yandex.ru.");
      setIsSubmitting(false);
    }
  }

  return <>
    <button className={`${className} application-trigger`} type="button" onClick={openDialog} title={title}>{children}</button>
    {isRendered && createPortal(<div className={`dialog-backdrop${isOpen ? " is-open" : ""}`} role="presentation" aria-hidden={!isOpen}>
      <section className="application-dialog" role="dialog" aria-modal="true" aria-labelledby="application-dialog-title">
        <button className="dialog-close" type="button" onClick={closeDialog} ref={closeButton} aria-label="Закрыть форму">×</button>
        <p className="eyebrow">Мост ценностей · Москва · 3–5 сентября 2026</p>
        <h2 id="application-dialog-title">Оставьте <em>заявку.</em></h2>
        <p className="dialog-lead">Мы свяжемся с вами, спокойно обсудим, подходит ли вам этот тренинг, и расскажем детали.</p>
        <form className="dialog-form" noValidate onSubmit={submit}>
          <div className="field"><label htmlFor="dialog-name">Имя</label><input id="dialog-name" type="text" autoComplete="name" placeholder="Как к вам обращаться" value={values.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "dialog-name-error" : undefined} />{errors.name && <p className="field-error" id="dialog-name-error">{errors.name}</p>}</div>
          <div className="field"><label htmlFor="dialog-phone">Телефон</label><input id="dialog-phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+7 999 123-45-67" value={values.phone} onChange={(event) => update("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "dialog-phone-error" : undefined} />{errors.phone && <p className="field-error" id="dialog-phone-error">{errors.phone}</p>}</div>
          <div className="field"><label htmlFor="dialog-email">Email</label><input id="dialog-email" type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" value={values.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "dialog-email-error" : undefined} />{errors.email && <p className="field-error" id="dialog-email-error">{errors.email}</p>}</div>
          {serverError && <p className="form-error" role="alert">{serverError}</p>}
          <button className="button primary form-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Отправляем…" : "Отправить заявку"}<span className="arrow-icon" aria-hidden="true" /></button>
          <p className="form-consent">Нажимая «Отправить заявку», вы соглашаетесь на обработку данных для связи по вашей заявке.</p>
        </form>
      </section>
    </div>, document.body)}
  </>;
}
