import React from "react";
import { Container } from "@/components/layout/Container";
import { CONTACT_DATA } from "@/data/contact";
import { ContactCard } from "@/components/contact/ContactCard";
import { ContactForm } from "@/components/contact/ContactForm";

export function Contact() {
  const { eyebrow, heading, description, items } = CONTACT_DATA;

  const emailItem = items.find((i) => i.id === "email");
  const githubItem = items.find((i) => i.id === "github");
  const linkedinItem = items.find((i) => i.id === "linkedin");
  const instagramItem = items.find((i) => i.id === "instagram");

  return (
    <section
      id="contact"
      aria-label="Contact Section"
      className="relative py-8 md:py-10 lg:py-[50px]"
    >
      <Container>
        {/* Section Header (Centered) */}
        <div className="text-center max-w-4xl lg:max-w-5xl mx-auto mb-12 sm:mb-16">
          {/* Eyebrow */}
          <p className="font-sans text-xs sm:text-sm font-medium tracking-widest text-slate-400 dark:text-slate-400 uppercase mb-3 sm:mb-4">
            {eyebrow}
          </p>

          {/* Heading */}
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 sm:mb-5">
            {heading}
          </h2>

          {/* Supporting Description (1-line on desktop) */}
          <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-400 font-normal leading-relaxed max-w-4xl mx-auto">
            {description}
          </p>
        </div>

        {/* Two-Column Contact Layout (Desktop: Left ~40%, Right ~60%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4 sm:gap-5">
            {/* Email Card (Full width of left column) */}
            {emailItem && <ContactCard item={emailItem} />}

            {/* Github & Linkedin Cards (Side-by-Side in 1 Row) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {githubItem && <ContactCard item={githubItem} />}
              {linkedinItem && <ContactCard item={linkedinItem} />}
            </div>

            {/* Instagram Card (Full width of left column) */}
            {instagramItem && <ContactCard item={instagramItem} />}
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
