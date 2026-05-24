import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const contactEmail = process.env.CONTACT_TO_EMAIL ?? "euelv720@gmail.com";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };

    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in all fields." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 },
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

    const { error } = await resend.emails.send({
      from: "Euel Portfolio <onboarding@resend.dev>",
      to: contactEmail,
      replyTo: email,
      subject: `Portfolio inquiry from ${name}`,
      html: `
        <!doctype html>
        <html>
          <body style="margin:0;background:#070707;padding:32px;font-family:Arial,Helvetica,sans-serif;color:#f5f5f5;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;margin:0 auto;border:1px solid #2a2a2a;background:#111111;">
              <tr>
                <td style="padding:28px 28px 20px;border-bottom:1px solid #2a2a2a;">
                  <p style="margin:0 0 12px;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#a3a3a3;">
                    Portfolio Inquiry
                  </p>
                  <h1 style="margin:0;font-size:30px;line-height:1.05;text-transform:uppercase;color:#ffffff;">
                    New message from ${safeName}
                  </h1>
                </td>
              </tr>
              <tr>
                <td style="padding:24px 28px;border-bottom:1px solid #2a2a2a;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="padding:0 0 14px;width:110px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8c8c8c;">Name</td>
                      <td style="padding:0 0 14px;font-size:15px;color:#ffffff;">${safeName}</td>
                    </tr>
                    <tr>
                      <td style="padding:0;width:110px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8c8c8c;">Email</td>
                      <td style="padding:0;font-size:15px;color:#ffffff;">
                        <a href="mailto:${safeEmail}" style="color:#ffffff;text-decoration:underline;text-underline-offset:4px;">${safeEmail}</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:28px;">
                  <p style="margin:0 0 14px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8c8c8c;">
                    Message
                  </p>
                  <div style="font-size:16px;line-height:1.7;color:#e7e7e7;white-space:normal;">
                    ${safeMessage}
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding:18px 28px;border-top:1px solid #2a2a2a;color:#777777;font-size:12px;">
                  Sent from the Euel portfolio contact form. Reply directly to this email to respond.
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      return NextResponse.json(
        { error: "Unable to send message right now." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
