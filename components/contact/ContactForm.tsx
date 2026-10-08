"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormFieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface StatusMessage {
  type: "success" | "error";
  text: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FormFieldErrors>({});
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error on typing
    if (fieldErrors[name as keyof FormFieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (values: FormValues): FormFieldErrors => {
    const errors: FormFieldErrors = {};
    const trimmedName = values.name.trim();
    const trimmedEmail = values.email.trim();
    const trimmedSubject = values.subject.trim();
    const trimmedMessage = values.message.trim();

    if (!trimmedName || trimmedName.length < 2) {
      errors.name = "Nama wajib diisi minimal 2 karakter.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      errors.email = "Alamat email tidak valid.";
    }

    if (!trimmedSubject || trimmedSubject.length < 2) {
      errors.subject = "Subjek wajib diisi minimal 2 karakter.";
    }

    if (!trimmedMessage || trimmedMessage.length < 5) {
      errors.message = "Pesan wajib diisi minimal 5 karakter.";
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(null);

    // 1. Client-side trim and validation
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatusMessage({
        type: "error",
        text: "Mohon lengkapi seluruh kolom formulir dengan benar.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formElement = e.currentTarget;
      const honeypotVal =
        (formElement.elements.namedItem("website") as HTMLInputElement)?.value || "";

      // 2. Send payload to API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          website: honeypotVal,
        }),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        setStatusMessage({
          type: "success",
          text:
            result.message ||
            "Pesan Anda berhasil terkirim! Terima kasih telah menghubungi saya.",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setFieldErrors({});
      } else {
        if (result?.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
        setStatusMessage({
          type: "error",
          text:
            result?.error ||
            "Gagal mengirim pesan melalui server. Silakan coba kembali.",
        });
      }
    } catch {
      setStatusMessage({
        type: "error",
        text: "Terjadi gangguan jaringan. Periksa koneksi internet Anda dan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0D1525] relative z-[1] p-6 sm:p-8 shadow-xs flex flex-col justify-between">
      <form onSubmit={handleSubmit} noValidate>
        {/* Name and Email Row */}
        {/* Honeypot field for bot protection */}
        <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="contact-name"
              className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
            >
              Nama <span className="text-rose-500">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              maxLength={100}
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Masukkan nama lengkap"
              className={`w-full rounded-xl border ${
                fieldErrors.name
                  ? "border-rose-500 dark:border-rose-500/80 focus:ring-rose-500"
                  : "border-slate-200 dark:border-white/10 focus:ring-[#3B82F6]"
              } bg-white dark:bg-[#080E1A] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed`}
            />
            {fieldErrors.name && (
              <p className="text-xs text-rose-500 mt-1.5">{fieldErrors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="contact-email"
              className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
            >
              Email <span className="text-rose-500">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              maxLength={150}
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Alamat email aktif"
              className={`w-full rounded-xl border ${
                fieldErrors.email
                  ? "border-rose-500 dark:border-rose-500/80 focus:ring-rose-500"
                  : "border-slate-200 dark:border-white/10 focus:ring-[#3B82F6]"
              } bg-white dark:bg-[#080E1A] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed`}
            />
            {fieldErrors.email && (
              <p className="text-xs text-rose-500 mt-1.5">{fieldErrors.email}</p>
            )}
          </div>
        </div>

        {/* Subject Field */}
        <div className="mb-5 sm:mb-6">
          <label
            htmlFor="contact-subject"
            className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
          >
            Subjek <span className="text-rose-500">*</span>
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            required
            maxLength={200}
            value={formData.subject}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="Topik pesan (misal: Diskusi Proyek / Tawaran Kolaborasi)"
            className={`w-full rounded-xl border ${
              fieldErrors.subject
                ? "border-rose-500 dark:border-rose-500/80 focus:ring-rose-500"
                : "border-slate-200 dark:border-white/10 focus:ring-[#3B82F6]"
            } bg-white dark:bg-[#080E1A] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:border-transparent transition-all disabled:opacity-60 disabled:cursor-not-allowed`}
          />
          {fieldErrors.subject && (
            <p className="text-xs text-rose-500 mt-1.5">{fieldErrors.subject}</p>
          )}
        </div>

        {/* Message Field */}
        <div className="mb-6 sm:mb-8">
          <label
            htmlFor="contact-message"
            className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
          >
            Pesan <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            maxLength={5000}
            value={formData.message}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="Ceritakan kebutuhan, ide, atau proyek yang ingin kamu diskusikan..."
            className={`w-full rounded-xl border ${
              fieldErrors.message
                ? "border-rose-500 dark:border-rose-500/80 focus:ring-rose-500"
                : "border-slate-200 dark:border-white/10 focus:ring-[#3B82F6]"
            } bg-white dark:bg-[#080E1A] p-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none disabled:opacity-60 disabled:cursor-not-allowed`}
          />
          {fieldErrors.message && (
            <p className="text-xs text-rose-500 mt-1.5">{fieldErrors.message}</p>
          )}
        </div>

        {/* Submit Feedback Notification */}
        {statusMessage && (
          <div
            role="alert"
            className={`p-4 rounded-xl mb-6 text-xs sm:text-sm font-medium flex items-start gap-3 transition-all ${
              statusMessage.type === "success"
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
            }`}
          >
            {statusMessage.type === "success" ? (
              <svg
                className="w-5 h-5 flex-shrink-0 text-emerald-500 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 flex-shrink-0 text-rose-500 mt-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span className="leading-snug">{statusMessage.text}</span>
          </div>
        )}

        {/* Send Button */}
        <div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            pill
            disabled={isSubmitting}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 text-sm font-medium inline-flex items-center gap-2.5 shadow-sm transition-all"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                <span>Mengirim...</span>
              </>
            ) : (
              <>
                <span>Kirim Pesan</span>
                <svg
                  className="w-4 h-4 fill-current transition-transform duration-200 group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
