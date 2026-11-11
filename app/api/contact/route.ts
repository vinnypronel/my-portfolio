import { NextResponse } from "next/server";
import { site } from "@/data/site";

/**
 * Contact form endpoint, Resend-ready.
 *
 * TO ENABLE EMAIL DELIVERY:
 *   1. Create a free account at https://resend.com and get an API key
 *   2. Add RESEND_API_KEY to your Vercel project env vars (and .env.local)
 *   3. Optionally verify a sending domain in Resend and update `from` below
 *
 * Until the key is set, this returns 503 and the form falls back to a
 * pre-filled mailto: link on the client, so contact always works.
 */
export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, reason: "email-service-not-configured" },
      { status: 503 }
    );
  }

  let body: { name?: unknown; email?: unknown; message?: unknown; company?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid-json" }, { status: 400 });
  }

  // Honeypot, checked here too: bots that post straight to the API skip the
  // client check. Answer "ok" so they don't retry.
  if (body.company) return NextResponse.json({ ok: true });

  const str = (v: unknown, max: number) =>
    (typeof v === "string" ? v : "").trim().slice(0, max);
  // Strip line breaks from anything that lands in an email header.
  const name = str(body.name, 200).replace(/[\r\n]+/g, " ");
  const email = str(body.email, 200);
  const message = str(body.message, 5000);

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, reason: "invalid-fields" }, { status: 400 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Update `from` to your verified Resend domain when you have one.
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [site.email],
      reply_to: email,
      subject: `Portfolio inquiry from ${name}`,
      text: `${message}\n\n${name} (${email})`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ ok: false, reason: "send-failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
