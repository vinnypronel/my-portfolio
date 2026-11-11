"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";

type FormStatus = "idle" | "sending" | "sent" | "mailto";

/**
 * Contact form. Posts to /api/contact (Resend-ready; see the route file).
 * If no email service is configured yet, it gracefully falls back to opening
 * the visitor's mail app with the message pre-filled, so the form always works.
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
      // Email service not configured yet → mailto fallback
      throw new Error("not-configured");
    } catch {
      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n${name} (${email})`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("mailto");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-accent/25 bg-accent/8 p-8 text-center"
      >
        <p className="font-display text-2xl font-semibold text-accent-deep">
          Message sent.
        </p>
        <p className="mt-2 text-ink-soft">
          Thanks for reaching out. I&rsquo;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot field, hidden from real users */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-semibold">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="rounded-xl border border-line bg-cream px-4 py-3 text-ink placeholder:text-ink-faint focus:border-accent"
            placeholder="Your name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="rounded-xl border border-line bg-cream px-4 py-3 text-ink placeholder:text-ink-faint focus:border-accent"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-semibold">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="resize-y rounded-xl border border-line bg-cream px-4 py-3 text-ink placeholder:text-ink-faint focus:border-accent"
          placeholder="What are you working on?"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm font-medium text-freelance">
          {error}
        </p>
      )}
      {status === "mailto" && (
        <p role="status" className="text-sm text-ink-soft">
          Opening your email app with the message pre-filled. Hit send there
          and it&rsquo;s on its way.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <a
          href={`mailto:${site.email}`}
          className="text-sm font-semibold text-accent hover:text-accent-deep"
        >
          or email me directly →
        </a>
      </div>
    </form>
  );
}
