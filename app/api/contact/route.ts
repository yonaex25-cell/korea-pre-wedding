import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  lineId: z.string().trim().optional().default(""),
  message: z.string().trim().min(5)
});

const resendTestFromEmail = "Dasoni <onboarding@resend.dev>";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getContactFromEmail(): string {
  const configuredFromEmail = process.env.CONTACT_FROM_EMAIL?.trim();
  const allowVerifiedFromEmail = process.env.CONTACT_FROM_EMAIL_VERIFIED === "true";

  if (!configuredFromEmail) {
    return resendTestFromEmail;
  }

  if (configuredFromEmail.includes("onboarding@resend.dev")) {
    return configuredFromEmail;
  }

  if (allowVerifiedFromEmail) {
    return configuredFromEmail;
  }

  console.warn(
    "[contact] CONTACT_FROM_EMAIL is set but CONTACT_FROM_EMAIL_VERIFIED is not true. Falling back to onboarding@resend.dev."
  );
  return resendTestFromEmail;
}

export async function POST(request: Request) {
  const json = await request.json().catch((error: unknown) => {
    console.error("[contact] Failed to parse request JSON", error);
    return null;
  });
  const parsed = contactSchema.safeParse(json);

  if (!parsed.success) {
    console.error("[contact] Invalid contact payload", parsed.error.flatten());
    return NextResponse.json({ message: "Please check your contact details." }, { status: 400 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "yonaex25@gmail.com";
  const fromEmail = getContactFromEmail();
  const { name, email, lineId, message } = parsed.data;

  if (!resendApiKey) {
    console.error("[contact] Missing RESEND_API_KEY. Add RESEND_API_KEY to Vercel Environment Variables.");
    return NextResponse.json({ message: "Contact email service is not configured." }, { status: 500 });
  }

  const receivedText = "Dasoni \ubb38\uc758\uac00 \uc811\uc218\ub418\uc5c8\uc2b5\ub2c8\ub2e4.";
  const nameLabel = "\uc774\ub984";
  const emailLabel = "\uc774\uba54\uc77c";
  const messageLabel = "\uba54\uc2dc\uc9c0";

  const textLines = [
    receivedText,
    "",
    `${nameLabel}: ${name}`,
    `${emailLabel}: ${email}`,
    lineId ? `LINE ID: ${lineId}` : null,
    "",
    `${messageLabel}:`,
    message
  ].filter((line): line is string => Boolean(line));

  const htmlRows: Array<[string, string]> = [
    [nameLabel, name],
    [emailLabel, email],
    ...(lineId ? [["LINE ID", lineId] as [string, string]] : []),
    [messageLabel, message]
  ];

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `[Dasoni \ubb38\uc758] ${name}`,
        text: textLines.join("\n"),
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;">
            <h2>${escapeHtml(receivedText)}</h2>
            <table style="border-collapse:collapse;width:100%;max-width:680px;">
              <tbody>
                ${htmlRows.map(([label, value]) => `
                  <tr>
                    <th style="width:120px;text-align:left;vertical-align:top;padding:10px;border-bottom:1px solid #eee;background:#fafafa;">${escapeHtml(label)}</th>
                    <td style="padding:10px;border-bottom:1px solid #eee;white-space:pre-wrap;">${escapeHtml(value)}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        `
      })
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error("[contact] Resend email send failed", {
        status: response.status,
        statusText: response.statusText,
        toEmail,
        fromEmail,
        errorText
      });
      return NextResponse.json({ message: "Failed to send contact email." }, { status: 502 });
    }
  } catch (error) {
    console.error("[contact] Resend request threw an error", error);
    return NextResponse.json({ message: "Failed to send contact email." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
