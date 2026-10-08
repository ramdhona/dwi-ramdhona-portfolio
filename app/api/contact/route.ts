import { NextResponse } from "next/server";
import { Resend } from "resend";
import { generateContactEmail } from "@/lib/email-template";

// In-memory sliding window IP rate limiter (5 requests per 15 minutes)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean expired records periodically
  if (rateLimitMap.size > 500) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (val.resetAt < now) rateLimitMap.delete(key);
    }
  }

  if (!record || record.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(request: Request) {
  try {
    // 1. IP-based Rate Limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : "127.0.0.1";

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Terlalu banyak permintaan pengiriman pesan. Silakan tunggu beberapa saat sebelum mencoba lagi.",
        },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          success: false,
          error: "Payload request tidak valid.",
        },
        { status: 400 }
      );
    }

    // 2. Honeypot check (anti-bot)
    if (body.website && typeof body.website === "string" && body.website.trim().length > 0) {
      // Silently accept without sending to avoid informing bot
      return NextResponse.json({
        success: true,
        message: "Pesan Anda berhasil dikirim!",
      });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const subject = typeof body.subject === "string" ? body.subject.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    // 3. Validation with strict length boundaries
    const fieldErrors: {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    } = {};

    if (!name || name.length < 2) {
      fieldErrors.name = "Nama wajib diisi minimal 2 karakter.";
    } else if (name.length > 100) {
      fieldErrors.name = "Nama maksimal 100 karakter.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      fieldErrors.email = "Alamat email tidak valid.";
    } else if (email.length > 150) {
      fieldErrors.email = "Alamat email maksimal 150 karakter.";
    }

    if (!subject || subject.length < 2) {
      fieldErrors.subject = "Subjek wajib diisi minimal 2 karakter.";
    } else if (subject.length > 200) {
      fieldErrors.subject = "Subjek maksimal 200 karakter.";
    }

    if (!message || message.length < 5) {
      fieldErrors.message = "Pesan wajib diisi minimal 5 karakter.";
    } else if (message.length > 5000) {
      fieldErrors.message = "Pesan maksimal 5000 karakter.";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Mohon periksa kembali kolom formulir Anda.",
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey || apiKey === "YOUR_NEW_RESEND_API_KEY") {
      return NextResponse.json(
        {
          success: false,
          error:
            "RESEND_API_KEY belum dikonfigurasi di file .env.local atau Vercel Environment Variables.",
        },
        { status: 500 }
      );
    }

    // Initialize Resend with server-side environment variable
    const resend = new Resend(apiKey);
    const targetEmail = "ramdhona13@gmail.com";
    const sender = "Dwi Ramdhona <onboarding@resend.dev>";

    // Generate formatted email using modern, responsive design template
    const emailContent = generateContactEmail({
      name,
      email,
      subject,
      message,
    });

    const { data, error } = await resend.emails.send({
      from: sender,
      to: [targetEmail],
      replyTo: email,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
    });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error:
            error.message ||
            "Gagal mengirim email melalui Resend. Silakan coba kembali.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Pesan Anda berhasil dikirim! Terima kasih telah menghubungi saya.",
      data: { id: data?.id },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error:
          "Terjadi kesalahan pada server saat memproses formulir. Silakan coba beberapa saat lagi.",
      },
      { status: 500 }
    );
  }
}
