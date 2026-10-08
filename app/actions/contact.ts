"use server";

import { Resend } from "resend";
import { generateContactEmail } from "@/lib/email-template";

export interface ContactActionState {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };
}

export async function sendContactEmail(
  _prevState: ContactActionState | null,
  formData: FormData
): Promise<ContactActionState> {
  const name = formData.get("name")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim() || "";
  const subject = formData.get("subject")?.toString().trim() || "";
  const message = formData.get("message")?.toString().trim() || "";

  // Honeypot check
  const honeypot = formData.get("website")?.toString().trim();
  if (honeypot) {
    return {
      success: true,
      message: "Pesan Anda berhasil dikirim!",
    };
  }

  // Validation
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
    return {
      success: false,
      error: "Mohon periksa kembali input formulir Anda.",
      fieldErrors,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || apiKey === "YOUR_NEW_RESEND_API_KEY") {
    return {
      success: false,
      error:
        "RESEND_API_KEY belum dikonfigurasi di file .env.local atau Vercel Environment Variables.",
    };
  }

  try {
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

    const { error } = await resend.emails.send({
      from: sender,
      to: [targetEmail],
      replyTo: email,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
    });

    if (error) {
      return {
        success: false,
        error:
          error.message ||
          "Gagal mengirim email via Resend. Silakan coba lagi.",
      };
    }

    return {
      success: true,
      message: "Pesan Anda berhasil dikirim! Terima kasih telah menghubungi saya.",
    };
  } catch {
    return {
      success: false,
      error: "Terjadi kesalahan koneksi server. Silakan coba beberapa saat lagi.",
    };
  }
}
