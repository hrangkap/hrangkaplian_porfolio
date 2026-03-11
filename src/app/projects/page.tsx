"use client";

import { useState, useEffect, useRef } from "react";

type Category = "All" | "IoT" | "AI / ML" | "Web Dev" | "Automation";

interface Project {
  title: string;
  description: string;
  categories: Category[];
  tech: string[];
  github: string;
  demo?: string;
  featured?: boolean;
  volunteer?: boolean;
}

const categories: Category[] = ["All", "IoT", "AI / ML", "Web Dev", "Automation"];

const projects: Project[] = [
  {
    title: "Recycling Rewards System",
    description:
      "A point-based reward system with recycling incentives for a smart and green campus. Uses object detection with a Raspberry Pi camera to identify recyclable items and rewards students with redeemable points through a web dashboard.",
    categories: ["IoT", "AI / ML"],
    tech: ["Python", "Django", "Raspberry Pi", "Object Detection", "MQTT", "SQLite", "Bootstrap"],
    github: "https://github.com/hrangkap/AIoT_Group_1",
    featured: true,
  },
  {
    title: "BLE MarTech System",
    description:
      "An AIoT marketing technology system using BLE beacons to track customer visits in retail shops. Features real-time entry/exit detection, shop density dashboards, and visitor history analytics via MQTT communication.",
    categories: ["IoT"],
    tech: ["C++", "MQTT", "BLE", "Platform.io", "HiveMQ", "IoT"],
    github: "https://github.com/hrangkap/ICT_720",
  },
  {
    title: "Software Design Project",
    description:
      "A Django-based web application built as a collaborative mini project during the TAIST-Tokyo Tech AIoT program, applying software design principles and full-stack development practices.",
    categories: ["Web Dev"],
    tech: ["Python", "Django", "HTML", "SQLite"],
    github: "https://github.com/hrangkap/Software_Design_Project",
  },
  {
    title: "SOS Myanmar",
    description:
      "Designed and built the website for \"Save Our Seas\" — a youth-led initiative combating marine plastic pollution through creativity, education, and community engagement.",
    categories: ["Web Dev"],
    tech: ["HTML", "CSS", "SCSS", "JavaScript"],
    github: "https://github.com/hrangkap/sosmyanmar",
    demo: "https://sosmyanmar.vercel.app",
    volunteer: true,
  },
  {
    title: "AI Portfolio Chatbot",
    description:
      "An AI-powered assistant integrated into this portfolio using n8n workflow automation and Google Gemini. Visitors can ask about Lian's skills, experience, and projects in real time. Features theme-reactive styling that syncs with the site's accent color and dark/light mode.",
    categories: ["AI / ML", "Automation"],
    tech: ["n8n", "Google Gemini", "Next.js", "TypeScript", "Webhook", "REST API"],
    github: "https://github.com/hrangkap/hrangkaplian_porfolio",
    featured: true,
  },
  {
    title: "Personal Portfolio",
    description:
      "This portfolio website — built with Next.js and Tailwind CSS, featuring dynamic theming, 3D profile effects, scroll animations, and a fully responsive design for all screen sizes.",
    categories: ["Web Dev"],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    github: "https://github.com/hrangkap/hrangkaplian_porfolio",
    demo: "https://hrangkaplian.com",
  },
];

function useInView(): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`group rounded-2xl border border-border bg-surface transition-all duration-700 hover:border-accent/30 ${
        inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex h-full flex-col p-5 sm:p-6 min-[2000px]:p-10">
        {/* Badges */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {project.featured && (
            <span
              className="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider sm:text-[10px]"
              style={{ backgroundColor: "var(--accent-glow)", color: "var(--accent)" }}
            >
              Featured
            </span>
          )}
          {project.volunteer && (
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-500 sm:text-[10px]">
              Volunteer
            </span>
          )}
          {project.categories
            .filter((c) => c !== "All")
            .map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-border px-2.5 py-0.5 text-[9px] font-medium text-muted sm:text-[10px]"
              >
                {cat}
              </span>
            ))}
        </div>

        {/* Title */}
        <h3 className="mb-2 text-base font-bold text-foreground sm:text-lg min-[2000px]:text-2xl">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mb-4 flex-1 text-xs leading-relaxed text-muted sm:text-sm min-[2000px]:text-base min-[2000px]:mb-6">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="mb-4 flex flex-wrap gap-1.5 min-[2000px]:mb-6 min-[2000px]:gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border bg-background px-2 py-0.5 text-[10px] font-medium text-muted sm:text-xs min-[2000px]:px-3 min-[2000px]:py-1 min-[2000px]:text-sm"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-accent sm:text-sm min-[2000px]:text-base"
          >
            <svg className="h-4 w-4 min-[2000px]:h-5 min-[2000px]:w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors hover:text-foreground sm:text-sm min-[2000px]:text-base"
              style={{ color: "var(--accent)" }}
            >
              <svg className="h-4 w-4 min-[2000px]:h-5 min-[2000px]:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.categories.includes(active));

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[1] bg-background/70" />

      <div className="relative z-[2] mx-auto max-w-4xl px-5 sm:px-8 2xl:max-w-6xl min-[2000px]:max-w-[1400px]">
        {/* Header */}
        <div className="pt-16 pb-10 sm:pt-24 sm:pb-14">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] sm:text-sm"
            style={{ color: "var(--accent)" }}
          >
            What I&apos;ve Built
          </p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl min-[2000px]:text-8xl">
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className="max-w-2xl text-sm text-muted sm:text-base md:text-lg 2xl:max-w-3xl min-[2000px]:text-xl">
            A collection of projects spanning IoT, AI/ML, and web development — from academic research to volunteer work.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mb-8 flex flex-wrap gap-2 sm:mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-xl border px-4 py-2 text-xs font-medium transition-all sm:text-sm min-[2000px]:px-6 min-[2000px]:py-2.5 min-[2000px]:text-base ${
                active === cat
                  ? "border-accent/50 text-white"
                  : "border-border text-muted hover:border-accent/30 hover:text-foreground"
              }`}
              style={
                active === cat
                  ? { backgroundColor: "var(--accent)" }
                  : undefined
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid gap-4 pb-16 sm:grid-cols-2 sm:gap-5 min-[2000px]:gap-8">
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}
