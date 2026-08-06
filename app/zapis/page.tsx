"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

export default function SignupPage() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
      if (!response.ok) throw new Error("Не удалось отправить заявку.");
      window.location.assign("/posle-zayavki");
    } catch {
      setServerError("Заявку пока не удалось отправить. Попробуйте ещё раз или напишите нам на aisukam-info@yandex.ru.");
      setIsSubmitting(false);
    }
  }

  return (
    <main className="form-page">
      <header className="form-topbar">
        <Link className="brand" href="/" aria-label="Мост ценностей, на главную страницу">
          <Image className="brand-logo" src="/logo.jpg" width={44} height={44} alt="" priority unoptimized />
          <span className="brand-copy"><b>Айсу Кам</b><small>путь внутренней опоры</small></span>
        </Link>
        <Link className="back-link" href="/">Вернуться на страницу программы</Link>
      </header>
      <section className="form-layout">
        <div className="form-intro">
          <p className="eyebrow">Мост ценностей · Москва · 3–5 сентября 2026</p>
          <h1>Оставьте <em>заявку.</em></h1>
          <p>Мы свяжемся с вами, спокойно обсудим, подходит ли вам этот тренинг, и расскажем детали.</p>
        </div>
        <form className="application-form" noValidate onSubmit={handleSubmit}>
          <div className="form-heading"><span>01</span><p>Контакты для связи</p></div>
          <div className="field">
            <label htmlFor="name">Имя</label>
            <input id="name" name="name" type="text" autoComplete="name" placeholder="Как к вам обращаться" value={values.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
            {errors.name && <p className="field-error" id="name-error">{errors.name}</p>}
          </div>
          <div className="field">
            <label htmlFor="phone">Телефон</label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+7 999 123-45-67" value={values.phone} onChange={(event) => update("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />
            {errors.phone && <p className="field-error" id="phone-error">{errors.phone}</p>}
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" value={values.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
            {errors.email && <p className="field-error" id="email-error">{errors.email}</p>}
          </div>
          {serverError && <p className="form-error" role="alert">{serverError}</p>}
          <button className="button primary form-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Отправляем…" : "Отправить заявку"}<span className="arrow-icon" aria-hidden="true" /></button>
          <p className="form-consent">Нажимая «Отправить заявку», вы соглашаетесь на обработку данных для связи по вашей заявке.</p>
        </form>
      </section>
    </main>
  );
}
