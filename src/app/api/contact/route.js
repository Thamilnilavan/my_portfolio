import nodemailer from "nodemailer";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function clean(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (rateLimit.get(ip) || []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW);
  if (recent.length >= RATE_LIMIT_MAX) return true;
  recent.push(now);
  rateLimit.set(ip, recent);
  return false;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const name = clean(body.name, 100);
    const email = clean(body.email, 254);
    const subject = clean(body.subject, 150);
    const message = clean(body.message, 5000);
    const website = clean(body.website, 200);

    // Bots commonly fill hidden fields that real visitors never see.
    if (website) {
      return Response.json({ success: true });
    }

    if (!name || !EMAIL_PATTERN.test(email) || !subject || message.length < 10) {
      return Response.json(
        { error: "Please provide a valid name, email, subject, and message." },
        { status: 400 }
      );
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return Response.json(
        { error: "Too many messages were sent. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    const recipient = process.env.CONTACT_EMAIL || gmailUser;

    if (!gmailUser || !gmailAppPassword || !recipient) {
      console.error("Gmail contact form environment variables are not configured.");
      return Response.json(
        { error: "The contact form is temporarily unavailable. Please email me directly." },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${gmailUser}>`,
      to: recipient,
      replyTo: `"${name.replaceAll('"', "")}" <${email}>`,
      subject: `[Portfolio] ${subject}`,
      text: [
        "New portfolio contact message",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        "",
        message,
      ].join("\n"),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Unable to send portfolio contact email:", error);
    return Response.json(
      { error: "Your message could not be sent. Please try again or email me directly." },
      { status: 500 }
    );
  }
}
