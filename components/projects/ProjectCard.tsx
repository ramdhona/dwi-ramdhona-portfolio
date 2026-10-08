import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const projectSlug = project.slug || String(project.id);
  const imageSrc = project.image.primary;
  const isExternalImage = imageSrc.startsWith("http");

  return (
    <Link
      href={`/portfolio/${projectSlug}`}
      scroll={true}
      className="block h-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded-2xl"
      aria-label={`Lihat detail proyek ${project.title}`}
    >
      <article
        aria-labelledby={`project-title-${projectSlug}`}
        className="interactive-card flex flex-col h-full rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#0D1525] relative z-[1] shadow-xs overflow-hidden cursor-pointer"
      >
        {/* Thumbnail Container */}
        <div className="card-image-wrapper relative w-full aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900/60">
          <Image
            src={imageSrc}
            alt={`Thumbnail ${project.title}`}
            fill
            loading="lazy"
            unoptimized={isExternalImage}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="card-image object-cover object-top"
          />
        </div>

        {/* Card Content */}
        <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-5 lg:p-6">
          <div>
            {/* Category Badge */}
            <div className="mb-2 sm:mb-3">
              <span className="inline-flex items-center rounded-full border border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-white/[0.04] px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-medium text-slate-600 dark:text-slate-400">
                {project.category}
              </span>
            </div>

            {/* Project Title */}
            <h3
              id={`project-title-${projectSlug}`}
              className="card-title font-heading text-sm sm:text-base lg:text-lg font-semibold leading-snug text-slate-900 dark:text-white mb-1.5 sm:mb-2.5 line-clamp-2"
            >
              {project.title}
            </h3>

            {/* Project Description */}
            <p className="font-sans text-[11px] sm:text-xs lg:text-sm leading-relaxed text-slate-600 dark:text-slate-400 mb-3 sm:mb-6 line-clamp-3 sm:line-clamp-4">
              {project.description}
            </p>
          </div>

          {/* Technology Badges Row (Hidden on mobile < 768px, visible on md+ tablet & desktop) */}
          <div className="hidden md:flex flex-wrap items-center gap-1 sm:gap-2 mt-auto pt-2">
            {project.technologyStack.map((tech) => {
              const isAstro =
                tech.name.toLowerCase() === "astro" ||
                (Boolean(tech.icon) && tech.icon.includes("astro"));

              return (
                <span
                  key={tech.name}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 dark:border-white/[0.08] bg-slate-100/60 dark:bg-white/[0.03] px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400"
                >
                  {tech.icon && (
                    <>
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={14}
                        height={14}
                        className={`w-3.5 h-3.5 object-contain ${
                          isAstro ? "dark:hidden" : ""
                        }`}
                      />
                      {isAstro && (
                        <Image
                          src="/assets/techstack/astro.webp"
                          alt={tech.name}
                          width={14}
                          height={14}
                          className="w-3.5 h-3.5 object-contain hidden dark:block"
                        />
                      )}
                    </>
                  )}
                  <span>{tech.name}</span>
                </span>
              );
            })}
          </div>
        </div>
      </article>
    </Link>
  );
}
