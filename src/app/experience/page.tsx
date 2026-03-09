"use client";

import { useEffect, useRef, useState } from "react";

const experience = [
  {
    role: "Algorithm Engineer",
    company: "Six Atomic Pte Ltd",
    location: "Bangkok, Thailand",
    period: "11/2024 — Present",
    current: true,
    description:
      "I currently work on algorithm development and software engineering for advanced pattern analysis systems. My work involves building computational logic for automated garment pattern processing and stitching analysis using geometric algorithms and structured pattern data.",
    highlights: [
      "Developing algorithms for garment pattern geometry analysis",
      "Implementing pattern matching and automated stitching logic",
      "Building software tools for pattern data processing and visualization",
      "Working with TypeScript and Node.js for backend logic development",
    ],
    tech: ["TypeScript", "Python", "Algorithm Design", "Computational Geometry", "AWS"],
  },
  {
    role: "Data Scientist",
    company: "Magnecomp Precision Technology",
    location: "Ayutthaya, Thailand",
    period: "07/2024 — 10/2024",
    current: false,
    description:
      "At Magnecomp, I worked on machine learning applications in manufacturing quality analysis.",
    highlights: [
      "Developing data analysis pipelines for manufacturing datasets",
      "Applying machine learning models to identify patterns in quality inspection data",
      "Supporting defect detection and production analysis using statistical techniques",
      "Collaborating with engineering teams to improve data-driven decision processes",
    ],
    tech: ["Python", "scikit-learn", "Pandas", "Statistical Analysis", "JMP", "Power BI"],
  },
  {
    role: "Junior Programmer",
    company: "Dir-Ace Technology",
    location: "Yangon, Myanmar",
    period: "08/2020 — 09/2021",
    current: false,
    description:
      "Worked on the development and maintenance of internal enterprise systems.",
    highlights: [
      "Developed features for a Job Arranger Management System",
      "Implemented backend functionality using C++ and Java",
      "Contributed to frontend UI development using Bootstrap",
      "Participated in debugging, testing, and system improvement",
    ],
    tech: ["C++", "Java", "Bootstrap", "SQL"],
  },
  {
    role: "Software Development Intern",
    company: "Pearl Yadana Software Solution",
    location: "Yangon, Myanmar",
    period: "05/2019 — 07/2019",
    current: false,
    description:
      "Contributed to the development of a Warehouse Management System.",
    highlights: [
      "Working with Oracle 11g database design",
      "Supporting application-level data integration",
      "Developing UI modules for data entry systems",
      "Assisting with system testing and documentation",
    ],
    tech: ["Oracle 11g", "SQL", "UI Development", "Vue.js"],
  },
];

function useInView(): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function ExperienceCard({ job, index }: { job: typeof experience[number]; index: number }) {
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className="relative flex">
      {/* Left: Period */}
      <div className="hidden w-[140px] shrink-0 pt-5 text-right sm:block md:w-[180px] 2xl:w-[220px] min-[2000px]:w-[280px]">
        <span className="text-sm font-bold text-foreground min-[2000px]:text-base">{job.period}</span>
        {job.company && (
          <p className="mt-0.5 text-xs text-muted">{job.company}</p>
        )}
        <p className="mt-0.5 text-[11px] text-muted">{job.location}</p>
      </div>

      {/* Timeline column */}
      <div className="relative mx-4 flex shrink-0 flex-col items-center sm:mx-6">
        {/* Dot with glow */}
        <div className="relative mt-5">
          <div
            className="absolute -inset-1.5 rounded-full opacity-25"
            style={{ backgroundColor: "var(--accent)" }}
          />
          <div
            className="relative h-3.5 w-3.5 rounded-full border-[3px] border-background"
            style={{ backgroundColor: "var(--accent)" }}
          />
        </div>
        {/* Vertical line segment */}
        {index < experience.length - 1 && (
          <div
            className="mt-0 w-[2px] flex-1 rounded-full"
            style={{ backgroundColor: "var(--accent)", opacity: 0.2 }}
          />
        )}
      </div>

      {/* Right: Card */}
      <div
        className={`mb-6 flex-1 rounded-2xl border border-border bg-surface transition-all duration-700 sm:mb-8 ${
          inView ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
        }`}
      >
        <div className="p-5 sm:p-6 min-[2000px]:p-10">
          {/* Mobile: period + company + location */}
          <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 sm:hidden">
            <span className="text-xs font-medium text-muted">{job.period}</span>
            <span className="text-[10px] text-muted">{job.location}</span>
            {job.current && (
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-500">
                Current
              </span>
            )}
          </div>

          <div className="mb-1 flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold text-foreground sm:text-lg min-[2000px]:text-2xl">{job.role}</h3>
            {job.current && (
              <span className="hidden rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-500 sm:inline-block">
                Current
              </span>
            )}
          </div>

          {job.company && (
            <p className="mb-3 text-xs font-medium sm:hidden" style={{ color: "var(--accent)" }}>
              {job.company}
            </p>
          )}

          <p className="mb-4 text-xs leading-relaxed text-muted sm:text-sm min-[2000px]:text-base min-[2000px]:mb-6">
            {job.description}
          </p>

          <ul className="mb-4 space-y-1.5 min-[2000px]:mb-6 min-[2000px]:space-y-2.5">
            {job.highlights.map((h, j) => (
              <li key={j} className="flex items-start gap-2 text-xs leading-relaxed text-muted sm:text-sm min-[2000px]:text-base">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                {h}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {job.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-border bg-background px-2 py-0.5 text-[10px] font-medium text-muted sm:text-xs min-[2000px]:px-3 min-[2000px]:py-1 min-[2000px]:text-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExperiencePage() {
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
            Career Journey
          </p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl min-[2000px]:text-8xl">
            Professional <span className="gradient-text">Experience</span>
          </h1>
          <p className="max-w-2xl text-sm text-muted sm:text-base md:text-lg">
            A timeline of my professional journey across algorithm engineering, data science, and software development.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pb-16">
          {experience.map((job, i) => (
            <ExperienceCard key={i} job={job} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}
