import React from "react";
import Image from "next/image";

interface TechBadgeProps {
  name: string;
  icon?: string;
}

export function TechBadge({ name, icon }: TechBadgeProps) {
  const isAstro = name.toLowerCase() === "astro" || (Boolean(icon) && icon!.includes("astro"));

  return (
    <div className="flex items-center gap-2.5 px-3 sm:px-3.5 py-2 rounded-xl bg-slate-100/90 dark:bg-white/[0.04] border border-slate-200/90 dark:border-white/[0.08] transition-all duration-200 hover:border-blue-500/40 hover:bg-slate-200/50 dark:hover:bg-white/[0.07] select-none group">
      {icon ? (
        <>
          <Image
            src={icon}
            alt={name}
            width={16}
            height={16}
            className={`w-4 h-4 shrink-0 object-contain transition-transform group-hover:scale-110 ${
              isAstro ? "dark:hidden" : ""
            }`}
          />
          {isAstro && (
            <Image
              src="/assets/techstack/astro.webp"
              alt={name}
              width={16}
              height={16}
              className="w-4 h-4 shrink-0 object-contain transition-transform group-hover:scale-110 hidden dark:block"
            />
          )}
        </>
      ) : (
        <TechIcon name={name} className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
      )}
      <span className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 tracking-tight">
        {name}
      </span>
    </div>
  );
}

function TechIcon({ name, className }: { name: string; className?: string }) {
  const normalized = name.toLowerCase().replace(/[\s\-_.]/g, "");

  switch (normalized) {
    case "figma":
      return (
        <svg className={className} viewBox="0 0 38 57" fill="none">
          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
        </svg>
      );

    case "html":
    case "html5":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M1.5 0h21l-1.9 21.3L12 24l-8.6-2.7L1.5 0z" fill="#E44D26" />
          <path d="M12 22l7.1-2.2 1.6-18.1H12v20.3z" fill="#F16529" />
          <path d="M12 9.5h3.9l-.3 3.6-3.6 1v3.2l6.2-1.7.1-1.6.5-6.1.1-1.6H12v3.2zm0-6.3h7.9l-.2 2.1H12V3.2z" fill="#EBEBEB" />
          <path d="M12 9.5H8.1l-.1-1.6H12V4.7H4.3l.7 8h7v-3.2zm0 8.2v-3.2l-3.6-1-.2-2.3H4.8l.5 5.6 6.7 1.9z" fill="#FFFFFF" />
        </svg>
      );

    case "css":
    case "css3":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M1.5 0h21l-1.9 21.3L12 24l-8.6-2.7L1.5 0z" fill="#1572B6" />
          <path d="M12 22l7.1-2.2 1.6-18.1H12v20.3z" fill="#33A9DC" />
          <path d="M12 9.5h3.9l-.3 3.6-3.6 1v3.2l6.2-1.7.7-7.7.1-1.6H12v3.2zm0-6.3h8l-.2 2.1H12V3.2z" fill="#EBEBEB" />
          <path d="M12 9.5H8.1l-.1-1.6H12V4.7H4.3l.7 8h7v-3.2zm0 8.2v-3.2l-3.6-1-.2-2.3H4.8l.5 5.6 6.7 1.9z" fill="#FFFFFF" />
        </svg>
      );

    case "laravel":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" color="#FF2D20">
          <path d="M21.2 5.5l-8.8-5.1c-.3-.2-.8-.2-1.1 0L2.5 5.5c-.3.2-.5.5-.5.9v10.3c0 .4.2.7.5.9l8.8 5.1c.3.2.8.2 1.1 0l8.8-5.1c.3-.2.5-.5.5-.9V6.4c0-.4-.2-.7-.5-.9zm-9.3-3.2l7.2 4.1-3 1.8-7.2-4.2 3-1.7zm-8 4.6l7.2 4.2v4.8l-7.2-4.2V6.9zm8.9 14.5v-7.8l7.2-4.2v7.8l-7.2 4.2z" />
        </svg>
      );

    case "javascript":
    case "js":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="3" fill="#F7DF1E" />
          <path d="M6.8 18.2c.4.7 1.2 1.2 2.2 1.2 1.3 0 2.1-.7 2.1-2.1v-7.1H9v7.1c0 .7-.3 1-1 1-.5 0-.9-.3-1.2-.6v.5zm8.1.1c.9.5 2 .9 3.2.9 1.9 0 3-1 3-2.5 0-1.4-.9-2.1-2.4-2.8l-.8-.4c-.9-.4-1.4-.7-1.4-1.3 0-.6.5-1.1 1.4-1.1.9 0 1.6.3 2 .8l1.3-1.2c-.7-.8-1.8-1.3-3.3-1.3-2 0-3.3 1.2-3.3 2.7 0 1.3.8 2.1 2.2 2.7l.8.3c1 .5 1.5.8 1.5 1.5 0 .7-.6 1.2-1.7 1.2-1.1 0-2-.5-2.6-1.3l-1.3 1.2z" fill="#000000" />
        </svg>
      );

    case "wordpress":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" color="#21759B">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.88 15.68l-3.3-9.56c.4-.02.78-.05 1.19-.05.28 0 .54.02.82.04l2.12 6.4 1.83-5.5-1.3-3.8c.45-.03.92-.04 1.4-.04.38 0 .75.01 1.13.04l2.67 7.9 1.5-4.88c.2-.64.29-1.2.29-1.68 0-.93-.33-1.36-.93-1.4-.14 0-.29-.01-.44-.01-.1 0-.19 0-.28.01.88-.69 1.98-1.1 3.17-1.1 2.45 0 4.54 1.63 5.2 3.88l-5.69 16.5c-2.44 1.13-5.2.97-7.46-.22l-1.95-6.58z" />
        </svg>
      );

    case "astro":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M8.358 20.162c-1.187-.565-1.428-2.227-.45-3.13 1.777-1.642 4.15-2.793 6.787-3.235.155-.026.309.083.313.24.04 1.53-.29 3.09-1.01 4.496-1.127 2.195-4.453 2.22-5.64 1.629z" fill="#FF5D01" />
          <path d="M12.984 2.82a.855.855 0 00-.776-.52.855.855 0 00-.776.52L5.86 16.71a.855.855 0 00.563 1.123 7.828 7.828 0 012.355 1.258.855.855 0 001.27-.468l2.16-5.836h-.008a.855.855 0 011.608 0l2.16 5.836a.855.855 0 001.27.468 7.828 7.828 0 012.355-1.258.855.855 0 00.563-1.123L12.984 2.82z" fill="#BC52EE" />
        </svg>
      );

    case "nextjs":
    case "next":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" color="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.88 17.52L10.3 7.2h2.22l5.7 7.74-.34 2.58zM8.34 7.2v9.6H6.66V7.2h1.68z" />
        </svg>
      );

    case "react":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="12" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)" stroke="#61DAFB" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)" stroke="#61DAFB" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        </svg>
      );

    case "vue":
    case "vuejs":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <path d="M1.5 2h4.5l6 10.5L18 2h4.5L12 20.5 1.5 2z" fill="#42B883" />
          <path d="M6 2h3.5l2.5 4.5L14.5 2H18l-6 10.5L6 2z" fill="#35495E" />
        </svg>
      );

    case "php":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" color="#777BB4">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-5.5 13H5l1.6-6.5h2.1c1.3 0 2.2.3 2.7.9.5.6.6 1.4.3 2.4-.3 1.2-.9 2-1.9 2.5-.7.4-1.8.7-3.3.7zm7 0h-1.5l1.6-6.5h2.1c1.3 0 2.2.3 2.7.9.5.6.6 1.4.3 2.4-.3 1.2-.9 2-1.9 2.5-.7.4-1.8.7-3.3.7zm2.4-3.6c.2-.8.1-1.3-.2-1.6-.3-.3-.8-.4-1.6-.4h-.8l-.8 3.3h.8c.8 0 1.5-.1 1.9-.3.5-.2.6-.6.7-1zm-7 0c.2-.8.1-1.3-.2-1.6-.3-.3-.8-.4-1.6-.4h-.8l-.8 3.3h.8c.8 0 1.5-.1 1.9-.3.5-.2.6-.6.7-1z" />
        </svg>
      );

    case "tailwindcss":
    case "tailwind":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" color="#38BDF8">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
        </svg>
      );

    case "typescript":
    case "ts":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="3" fill="#3178C6" />
          <path d="M12.8 18.3c.9.5 2.1.8 3.3.8 2 0 3.2-1 3.2-2.6 0-1.5-.9-2.3-2.6-3l-.8-.3c-1.1-.4-1.7-.8-1.7-1.5 0-.7.6-1.2 1.6-1.2 1 0 1.8.4 2.3.8l1.1-1.6c-.8-.7-1.9-1.1-3.4-1.1-2.1 0-3.5 1.2-3.5 2.9 0 1.4.9 2.3 2.5 3l.8.3c1.2.5 1.8.9 1.8 1.6 0 .8-.7 1.3-1.8 1.3-1.2 0-2.3-.5-3-1.2l-1.3 1.7zM4 9.5h6.3V7.7H1.7v1.8H4v8.8h2.3V9.5z" fill="#FFFFFF" />
        </svg>
      );

    case "bootstrap":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" color="#7952B3">
          <path d="M21.6 4.8C20.8 3.2 19.5 2 17.8 1.2 16.1.4 14.2 0 12 0H3.6C2.6 0 1.7.4 1.1 1.1.4 1.7 0 2.6 0 3.6v16.8c0 1 .4 1.9 1.1 2.5.7.7 1.6 1.1 2.5 1.1H12c2.2 0 4.1-.4 5.8-1.2 1.7-.8 3-2 3.8-3.6.8-1.6 1.2-3.5 1.2-5.6 0-2.2-.4-4.1-1.2-5.6zm-5.7 10.9c-.8.8-1.9 1.2-3.4 1.2h-4V7.1h4c1.4 0 2.6.4 3.4 1.2.8.8 1.2 1.9 1.2 3.4 0 1.5-.4 2.6-1.2 3.4z" />
        </svg>
      );

    case "mysql":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" color="#4479A1">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c-2.5 0-4-1.5-4-3.5s1.5-3.5 4-3.5c1.2 0 2.2.4 2.9 1.1l-1.3 1.4c-.4-.4-1-.7-1.6-.7-1.3 0-2.1.8-2.1 2s.8 2 2.1 2c.6 0 1.2-.3 1.6-.7l1.3 1.4c-.7.7-1.7 1.1-2.9 1.1z" />
        </svg>
      );

    case "uiux":
    case "prototyping":
    case "webdesign":
    case "mobiledesign":
    case "dashboarddesign":
    case "designsystem":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      );

    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
  }
}
