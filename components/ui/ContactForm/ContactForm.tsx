"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/seo/site-config";
import { MarqueeTextarea } from "@/components/ui/MarqueeTextarea";
import { cn } from "@/utils";
import "./ContactForm.scss";

type FormType = "consultation" | "course" | "general";

interface ContactFormProps {
  defaultType?: FormType;
  className?: string;
}

export function ContactForm({ defaultType = "general", className }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json.error ?? "Ошибка отправки");

      setStatus("success");
      setMessage(json.message);
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Не удалось отправить. Напишите напрямую в Telegram или WhatsApp.");
    }
  }

  return (
    <form
      className={cn("contact-form", className)}
      onSubmit={handleSubmit}
      aria-label="Форма обратной связи"
    >
      <div className="contact-form__field">
        <label htmlFor="cf-name">Ваше имя</label>
        <input id="cf-name" name="name" type="text" required autoComplete="name" />
      </div>

      <div className="contact-form__field">
        <label htmlFor="cf-contact">Telegram или телефон</label>
        <input id="cf-contact" name="contact" type="text" required placeholder="@username или +7..." />
      </div>

      <div className="contact-form__field">
        <label htmlFor="cf-type">Тип обращения</label>
        <select id="cf-type" name="type" defaultValue={defaultType}>
          <option value="consultation">Запись на консультацию</option>
          <option value="course">Регистрация на курс / группу</option>
          <option value="general">Общий вопрос</option>
        </select>
      </div>

      <MarqueeTextarea id="cf-message" name="message" label="Сообщение" required />

      <button
        type="submit"
        className="button button_primary button_large contact-form__submit"
        disabled={status === "loading"}
        aria-label="Отправить заявку"
      >
        <span className="button__label">
          {status === "loading" ? "Отправка..." : "Отправить заявку"}
        </span>
      </button>

      {status === "success" && (
        <p className="contact-form__status contact-form__status_success" role="status">
          {message || "Заявка принята! Мы свяжемся с вами в Telegram или WhatsApp."}
        </p>
      )}
      {status === "error" && (
        <p className="contact-form__status contact-form__status_error" role="alert">
          {message}
          <span className="contact-form__quick-links">
            <a href={siteConfig.contacts.telegram}>Telegram</a>
            {" · "}
            <a href={siteConfig.contacts.whatsapp}>WhatsApp</a>
          </span>
        </p>
      )}
    </form>
  );
}
