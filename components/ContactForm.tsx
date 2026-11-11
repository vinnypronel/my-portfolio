"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";

type FormStatus = "idle" | "sending" | "sent" | "mailto";

/**
 * Contact form. Posts to /api/contact (Resend-ready; see the route file).
 * If no email service is configured yet, it falls back to opening the
 * visitor's mail app with the message pre-filled, so the form always works.
 */
export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    // Honeypot: bots fill it, humans never see it
    if (String(data.get("company") ?? "")) return;

    if (!name || !email || !message) {
      setError("Please fill out all three fields.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      throw new Error("not-configured");
    } catch {
      const subject = encodeURIComponent(`Project inquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n${name} (${email})`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("mailto");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="border-l border-accent pl-6">
        <p className="display-md font-semibold text-fg">Message sent.</p>
        <p className="mt-3 text-fg-soft">Thanks for reaching out. I&rsquo;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="eyebrow">
            Name
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className="field" placeholder="Your name" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="eyebrow">
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className="field" placeholder="you@example.com" />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="eyebrow">
          Project
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="field resize-y"
          placeholder="What are you building, and what does it need to do for the business?"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-accent">
          {error}
        </p>
      )}
      {status === "mailto" && (
        <p role="status" className="text-sm text-fg-soft">
          Opening your email app with the message pre-filled. Hit send there and it&rsquo;s on its way.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60">
          {status === "sending" ? "Sending" : "Send message"}
        </button>
        <a href={`mailto:${site.email}`} className="link-sweep font-mono text-[12px] tracking-[0.12em] text-fg-soft uppercase hover:text-fg">
          or email directly
        </a>
      </div>
    </form>
  );
}
