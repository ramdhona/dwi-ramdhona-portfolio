import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { GlowCursor, GLOW_CURSOR_CONFIG } from "@/components/ui/GlowCursor";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://dwiramdhona.com"
  ),
  title: {
    default: "Dwi Ramdhona — Web Developer & UI/UX Designer",
    template: "%s — Dwi Ramdhona",
  },
  description:
    "Personal portfolio of Dwi Ramdhona, S.Kom — Web Developer & UI/UX Designer yang berfokus pada pengembangan website responsif, aplikasi web modern, dan desain antarmuka intuitif.",
  keywords: [
    "Dwi Ramdhona",
    "Web Developer",
    "UI/UX Designer",
    "Frontend Developer",
    "Portfolio",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
  ],
  authors: [{ name: "Dwi Ramdhona", url: "https://dwiramdhona.com" }],
  creator: "Dwi Ramdhona",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "Portfolio Dwi Ramdhona",
    title: "Dwi Ramdhona — Web Developer & UI/UX Designer",
    description:
      "Personal portfolio of Dwi Ramdhona, S.Kom — Web Developer & UI/UX Designer.",
    images: [
      {
        url: "/assets/lanyard/card-front.webp",
        width: 800,
        height: 1200,
        alt: "Kartu Profil Dwi Ramdhona",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dwi Ramdhona — Web Developer & UI/UX Designer",
    description:
      "Personal portfolio of Dwi Ramdhona, S.Kom — Web Developer & UI/UX Designer.",
    images: ["/assets/lanyard/card-front.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${manrope.variable} h-full scroll-smooth scroll-pt-16 sm:scroll-pt-20 antialiased`}
    >
      <head>
        <link
          rel="preload"
          href="/assets/lanyard/card-front.webp"
          as="image"
          type="image/webp"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && systemDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans transition-colors duration-200">
        <ThemeProvider>
          <GlowCursor
            {...GLOW_CURSOR_CONFIG}
            className="relative min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200"
          >
            {children}
          </GlowCursor>
        </ThemeProvider>
      </body>
    </html>
  );
}
