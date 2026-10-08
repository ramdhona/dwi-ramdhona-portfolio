import React from "react";
import { Container } from "@/components/layout/Container";
import { PORTFOLIO_DATA, getSortedProjects } from "@/data/projects";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export function Projects() {
  const { eyebrow, heading, description, categories } = PORTFOLIO_DATA;
  const projects = getSortedProjects();

  return (
    <section
      id="portfolio"
      aria-label="Portfolio Section"
      className="relative py-8 md:py-10 lg:py-[50px]"
    >
      <Container>
        {/* Section Header (Centered) */}
        <div className="text-center max-w-3xl sm:max-w-4xl mx-auto mb-10 sm:mb-12">
          {/* Eyebrow */}
          <p className="font-sans text-sm sm:text-base text-slate-500 dark:text-slate-400 font-normal mb-2.5 tracking-normal">
            {eyebrow}
          </p>

          {/* Heading */}
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 sm:mb-6">
            {heading}
          </h2>

          {/* Supporting Description */}
          <p className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            {description}
          </p>
        </div>

        {/* Interactive Category Filter and 3-Column Project Grid */}
        <ProjectGrid categories={categories} projects={projects} />
      </Container>
    </section>
  );
}

export const Portfolio = Projects;
