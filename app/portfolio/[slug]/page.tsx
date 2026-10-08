import type { Metadata } from "next";
import { notFound } from "next/navigation";
import projects, { getProjectBySlug } from "@/data/projects";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectHeader } from "@/components/projects/detail/ProjectHeader";
import { ProjectInfoCards } from "@/components/projects/detail/ProjectInfoCards";
import { PortfolioMediaSection } from "@/components/projects/detail/PortfolioMediaSection";
import { ScrollToTop } from "@/components/projects/detail/ScrollToTop";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found — Dwi Ramdhona",
      description: "Halaman detail proyek portofolio tidak ditemukan.",
    };
  }

  return {
    title: `${project.title} — Dwi Ramdhona`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Portfolio Dwi Ramdhona`,
      description: project.description,
      images: [
        {
          url: project.image.primary,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const badgeCategory =
    project.badgeCategory ||
    (project.category === "Design" ? "UI/UX Design" : "Web Development");

  return (
    <>
      <ScrollToTop />
      <Navbar />

      <main id="main-content" className="main-layout flex-1" tabIndex={-1}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-16">
          <ProjectHeader
            title={project.title}
            badgeCategory={badgeCategory}
            description={project.description}
            liveUrl={project.link}
          />

          <PortfolioMediaSection
            image={project.image.primary}
            gallery={project.screenshotGallery}
            title={project.title}
          >
            <ProjectInfoCards
              problem={project.problem}
              solution={project.solution}
              features={project.features}
              technologies={project.technologyStack}
            />
          </PortfolioMediaSection>
        </div>
      </main>

      <Footer />
    </>
  );
}
