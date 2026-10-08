"use client";

import React, { useState } from "react";
import { ProjectItem, ProjectCategory } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/Button";

interface ProjectGridProps {
  categories: Array<"Tampilkan Semua" | ProjectCategory>;
  projects: ProjectItem[];
}

const INITIAL_PROJECTS = 6;
const LOAD_MORE_COUNT = 6;

export function ProjectGrid({ categories, projects }: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Tampilkan Semua");
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_PROJECTS);

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "Tampilkan Semua") return true;
    if (activeCategory === "Design") {
      return (
        project.category.toLowerCase().includes("design") ||
        project.category.toLowerCase().includes("desgin")
      );
    }
    return project.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(INITIAL_PROJECTS);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + LOAD_MORE_COUNT, filteredProjects.length)
    );
  };

  return (
    <div>
      {/* Category Tabs Pill (Centered) */}
      <div className="flex justify-center mb-10 sm:mb-14">
        <div
          role="tablist"
          aria-label="Filter Kategori Proyek"
          className="inline-flex max-w-full overflow-x-auto p-1 sm:p-1.5 rounded-full border border-slate-200/80 dark:border-white/[0.08] bg-slate-100 dark:bg-[#0D1525] relative z-[1] shadow-xs"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleCategoryChange(category)}
                className={`rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-200 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
                  isActive
                    ? "bg-[#182234] dark:bg-[#1E293B] text-white shadow-sm border border-slate-700/50 dark:border-white/10"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2-Column Mobile, 3-Column Desktop Projects Grid */}
      <div className="interactive-card-grid grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 items-stretch pt-2 pb-3">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Bottom Button: Lihat Selengkapnya (Conditional rendering: only when hasMore is true) */}
      {hasMore && (
        <div className="flex justify-center mt-12 sm:mt-16">
          <Button
            variant="secondary"
            size="md"
            pill
            onClick={handleLoadMore}
            className="border-slate-300 dark:border-white/10 bg-slate-100/90 dark:bg-[#131D2E] text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#1C283F] hover:text-slate-950 dark:hover:text-white px-6 py-2.5 text-sm font-medium inline-flex items-center gap-2"
          >
            <span>Lihat Selengkapnya</span>
            <svg
              className="w-4 h-4 text-slate-500 dark:text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </Button>
        </div>
      )}
    </div>
  );
}
