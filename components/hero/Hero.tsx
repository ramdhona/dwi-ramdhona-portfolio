import React from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { TextType } from "@/components/ui/TextType";
import { GradientText } from "@/components/ui/GradientText";

import { HeroLanyard } from "./HeroLanyard";

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Hero Section"
      className="relative flex min-h-[calc(100vh-64px)] items-center pt-2 sm:pt-4 lg:pt-0 pb-12 sm:pb-16 lg:pb-24"
    >
      <Container className="px-5 sm:px-8 md:px-10 lg:px-8">
        {/* Responsive Grid: Lanyard top on Mobile/Tablet (order-1) & Right on Desktop (lg:order-2); Hero Content bottom on Mobile/Tablet (order-2) & Left on Desktop (lg:order-1) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-center w-full">
          {/* Lanyard Column: Top on Mobile & Tablet (order-1), Right Column on Desktop (lg:order-2) */}
          <div
            className="hero-lanyard-container order-1 lg:order-2 flex items-center justify-center w-full h-[320px] xs:h-[350px] sm:h-[380px] md:h-[440px] lg:h-[580px] xl:h-[620px] 2xl:h-[760px] lg:col-span-6 relative overflow-visible"
          >
            <HeroLanyard />
          </div>

          {/* Hero Content Column: Below Lanyard on Mobile & Tablet (order-2), Left Column on Desktop (lg:order-1) */}
          <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col justify-center text-left">
            {/* Eyebrow Greeting */}
            <p className="font-sans text-lg sm:text-xl text-slate-400 font-normal mb-3 tracking-normal">
              Welcome to my portfolio
            </p>

            {/* Main Headline (H1) with React Bits Typewriter Animation */}
            <TextType
              as="h1"
              text={["Hi, I'm Dwi Ramdhona"]}
              typingSpeed={75}
              deletingSpeed={50}
              pauseDuration={1500}
              initialDelay={400}
              showCursor={true}
              cursorCharacter="_"
              loop={true}
              className="hero-text-type font-heading text-[clamp(1.6rem,7.5vw,2.25rem)] sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-4 whitespace-nowrap"
              cursorClassName="text-slate-900 dark:text-white font-bold"
            />

            {/* Role / Subtitle with React Bits Gradient Text */}
            <p className="font-heading text-xl sm:text-2xl font-medium tracking-tight mb-4">
              <GradientText
                colors={["#2563EB", "#60A5FA", "#2563EB"]}
                animationSpeed={8}
                showBorder={false}
                direction="horizontal"
                pauseOnHover={false}
                yoyo={true}
              >
                Web Developer & UI/UX Designer
              </GradientText>
            </p>

            {/* Description Paragraph */}
            <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed max-w-xl mb-8">
              Saya membantu mengubah ide menjadi website yang responsif dan
              antarmuka digital yang intuitif melalui pengembangan web dan
              desain UI/UX.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              {/* Primary CTA Button: Lihat Portofolio */}
              <Button
                variant="primary"
                size="md"
                pill
                href="#portfolio"
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-lg shadow-blue-500/25 px-6 py-3 text-sm sm:text-base font-medium inline-flex items-center gap-2 group"
              >
                <span>Lihat Portofolio</span>
                <svg
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.25"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Button>

              {/* Download CV CTA Button */}
              <Button
                variant="outline"
                size="md"
                pill
                href="/assets/cv/CV_DWI%20RAMDHONA.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-[#131D2E] text-slate-800 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-[#1E2D47] hover:text-slate-950 dark:hover:text-white px-6 py-3 text-sm sm:text-base font-medium inline-flex items-center gap-2 group"
              >
                <svg
                  className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                <span>Download CV</span>
              </Button>

              {/* Secondary CTA Button: Hubungi Saya */}
              <Button
                variant="outline"
                size="md"
                pill
                href="#contact"
                className="border-slate-300 dark:border-slate-700 bg-slate-100/80 dark:bg-[#131D2E] text-slate-800 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-[#1E2D47] hover:text-slate-950 dark:hover:text-white px-6 py-3 text-sm sm:text-base font-medium"
              >
                Hubungi Saya
              </Button>
            </div>

            {/* Social Links Row */}
            <div className="flex items-center gap-3">
              {/* GitHub */}
              <a
                href="https://github.com/ramdhona"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Dwi Ramdhona"
                className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-[#131D2E] relative z-[1] shadow-xs text-slate-700 dark:text-slate-300 transition-all duration-200 hover:border-[#3B82F6]/60 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] hover:text-[#3B82F6] dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/dwi-ramdhona-300560188/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Dwi Ramdhona"
                className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-[#131D2E] relative z-[1] shadow-xs text-slate-700 dark:text-slate-300 transition-all duration-200 hover:border-[#3B82F6]/60 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] hover:text-[#3B82F6] dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/ramdhona_666"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Dwi Ramdhona"
                className="inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-[#131D2E] relative z-[1] shadow-xs text-slate-700 dark:text-slate-300 transition-all duration-200 hover:border-[#3B82F6]/60 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] hover:text-[#3B82F6] dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

