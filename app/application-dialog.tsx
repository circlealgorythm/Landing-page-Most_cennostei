"use client";

import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type FormValues = { name: string; phone: string; email: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;
const initialValues: FormValues = { name: "", phone: "", email: "" };

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  let body = digits.startsWith("7") || digits.startsWith("8") ? digits.slice(1) : digits;
  let res = "+7";
  if (body.length > 0) res += " (" + body.slice(0, 3);
  if (body.length >= 3) res += ") " + body.slice(3, 6);
  if (body.length >= 6) res += "-" + body.slice(6, 8);
  if (body.length >= 8) res += "-" + body.slice(8, 10);
  return res;
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) {
    errors.name = "Укажите имя — не менее 2 символов.";
  }
  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) {
    errors.phone = "Укажите телефон в формате +7 (999) 123-45-67.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Проверьте адрес электронной почты.";
  }
  return errors;
}

export function ApplicationDialog({ className, children, title }: { className: string; children: ReactNode; title?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function openDialog() {
    const dialog = dialogRef.current;
    if (dialog) {
      if (!dialog.open) {
        dialog.showModal();
        document.body.classList.add("dialog-open");
        requestAnimationFrame(() => {
          dialog.classList.add("is-open");
          const firstInput = dialog.querySelector<HTMLInputElement>("#dialog-name");
          firstInput?.focus();
        });
      }
    }
  }

  function closeDialog() {
    const dialog = dialogRef.current;
    if (dialog && dialog.open) {
      dialog.classList.remove("is-open");
      document.body.classList.remove("dialog-open");
      setTimeout(() => {
        if (dialog.open) dialog.close();
      }, 240);
    }
  }

  function handleDialogClick(event: React.MouseEvent<HTMLDialogElement>) {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (
      rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX && event.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      closeDialog();
    }
  }

  const update = (field: keyof FormValues, value: string) => {
    const formatted = field === "phone" ? formatPhone(value) : value;
    setValues((current) => ({ ...current, [field]: formatted }));
    if (touched[field]) {
      const nextErrors = validate({ ...values, [field]: formatted });
      setErrors((curr) => ({ ...curr, [field]: nextErrors[field] }));
    }
  };

  const handleBlur = (field: keyof FormValues) => {
    setTouched((curr) => ({ ...curr, [field]: true }));
    const nextErrors = validate(values);
    setErrors((curr) => ({ ...curr, [field]: nextErrors[field] }));
  };

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ name: true, phone: true, email: true });
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setServerError("");
    if (Object.keys(nextErrors).length) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/application", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
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

  return (
    <>
      <button className={`${className} application-trigger`} type="button" onClick={openDialog} title={title}>
        {children}
      </button>
      {mounted && createPortal(
        <dialog
          ref={dialogRef}
          className="application-dialog"
          onClick={handleDialogClick}
          onClose={() => document.body.classList.remove("dialog-open")}
          aria-labelledby="application-dialog-title"
        >
          <button className="dialog-close" type="button" onClick={closeDialog} aria-label="Закрыть форму">×</button>
          <p className="eyebrow">Мост ценностей · Москва · 3–5 сентября 2026</p>
          <h2 id="application-dialog-title">Оставьте <em>заявку.</em></h2>
          <p className="dialog-lead">Мы свяжемся с вами, спокойно обсудим, подходит ли вам этот тренинг, и расскажем детали.</p>
          <form className="dialog-form" noValidate onSubmit={submit}>
            <div className="field">
              <label htmlFor="dialog-name">Имя</label>
              <input
                id="dialog-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Как к вам обращаться"
                value={values.name}
                onChange={(event) => update("name", event.target.value)}
                onBlur={() => handleBlur("name")}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "dialog-name-error" : undefined}
                required
              />
              {errors.name && <p className="field-error" id="dialog-name-error" role="alert">{errors.name}</p>}
            </div>
            <div className="field">
              <label htmlFor="dialog-phone">Телефон</label>
              <input
                id="dialog-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="+7 (999) 123-45-67"
                value={values.phone}
                onChange={(event) => update("phone", event.target.value)}
                onBlur={() => handleBlur("phone")}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "dialog-phone-error" : undefined}
                required
              />
              {errors.phone && <p className="field-error" id="dialog-phone-error" role="alert">{errors.phone}</p>}
            </div>
            <div className="field">
              <label htmlFor="dialog-email">Email</label>
              <input
                id="dialog-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={(event) => update("email", event.target.value)}
                onBlur={() => handleBlur("email")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "dialog-email-error" : undefined}
                required
              />
              {errors.email && <p className="field-error" id="dialog-email-error" role="alert">{errors.email}</p>}
            </div>
            {serverError && <p className="form-error" role="alert">{serverError}</p>}
            <button className="button primary form-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Отправляем…" : "Отправить заявку"}<span className="arrow-icon" aria-hidden="true" />
            </button>
            <p className="form-consent">Оставляя заявку, вы соглашаетесь на обработку данных в соответствии с политикой конфиденциальности, а также с договором офертой на оказание услуг</p>
          </form>
        </dialog>,
        document.body
      )}
    </>
  );
}
