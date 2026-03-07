"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useCallback, useState } from "react";

const sections = [
  { id: "intro", label: "Intro" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "cv", label: "CV" },
];

const skillCategories = [
  {
    title: "Programming Languages",
    items: ["Python", "TypeScript", "JavaScript", "C++", "SQL", "Java"],
  },
  {
    title: "Machine Learning & Data Science",
    items: ["Machine Learning", "Data Mining", "Explainable AI", "Clustering & Unsupervised Learning", "Statistical Data Analysis", "Model Interpretability"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["scikit-learn", "PyTorch", "TensorFlow", "Pandas", "NumPy"],
  },
  {
    title: "Software Development",
    items: ["Node.js", "React", "Next.js", "REST APIs", "System Design", "Backend Development", "Frontend Development"],
  },
  {
    title: "Tools & Platforms",
    items: ["Git", "GitLab CI/CD", "Docker", "AWS", "Linux / macOS", "VS Code"],
  },
];

const education = [
  {
    degree: "Master of Engineering (AI and IoT)",
    school: "TAIST-Science Tokyo Program, Kasetsart University, Thailand",
    gpa: "3.89 / 4.0",
    details: "Research focus: Improving clustering interpretability through discriminative dimension selection in high-dimensional data.",
    publication: "Discriminative Dimension Selection for Clustering Interpretability — Published in the 16th International Conference on Knowledge and Smart Technology (KST 2024).",
  },
  {
    degree: "Bachelor of Computer Science",
    school: "Computer University, Kalay",
    gpa: null,
    details: "Studied core topics including Programming, Software Engineering, Database Systems, Data Structures and Algorithms.",
    publication: null,
  },
];

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-6 sm:mb-8">
      <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl">{title}</h2>
      <div className="mt-2 h-0.5 w-12 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
    </div>
  );
}

export default function AboutPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [activeSection, setActiveSection] = useState(sections[0].id);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const animateObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        }
      },
      { threshold: 0.1 }
    );

    const activeObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.3, rootMargin: "-20% 0px -50% 0px" }
    );

    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) {
        animateObserver.observe(el);
        activeObserver.observe(el);
      }
    }
    return () => {
      animateObserver.disconnect();
      activeObserver.disconnect();
    };
  }, []);

  const sectionClass = (id: string) =>
    `min-h-[calc(100vh-73px)] pt-24 pb-10 sm:pt-32 sm:pb-16 transition-all duration-700 ${
      visibleSections.has(id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`;

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[1] bg-background/70" />

      {/* Desktop sidebar nav (labels without numbers) */}
      <nav className="fixed left-6 top-1/2 z-[3] hidden -translate-y-1/2 xl:flex xl:flex-col xl:gap-3">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className={`text-left text-xs font-medium transition-all duration-300 ${
              activeSection === s.id
                ? "translate-x-1 scale-105"
                : "opacity-50 hover:opacity-80"
            }`}
            style={{ color: activeSection === s.id ? "var(--accent)" : undefined }}
          >
            {s.label}
          </button>
        ))}
      </nav>

      {/* Mobile dot nav */}
      <nav className="fixed right-3 top-1/2 z-[3] flex -translate-y-1/2 flex-col gap-3 xl:hidden">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="group relative flex items-center justify-end"
          >
            <span
              className={`mr-2 text-[10px] font-medium transition-all ${
                activeSection === s.id ? "opacity-100" : "opacity-0 group-hover:opacity-70"
              }`}
              style={{ color: "var(--accent)" }}
            >
              {s.label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                activeSection === s.id ? "h-3 w-3" : "h-2 w-2 opacity-40"
              }`}
              style={{ backgroundColor: activeSection === s.id ? "var(--accent)" : "var(--foreground)" }}
            />
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className="relative z-[2] mx-auto max-w-4xl px-5 pr-10 sm:px-8 sm:pr-14 xl:pr-8">
        {/* 1. INTRO */}
        <section id="intro" className={sectionClass("intro")}>
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] sm:text-sm"
            style={{ color: "var(--accent)" }}
          >
            Get to know me
          </p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            About <span className="gradient-text">Me</span>
          </h1>
          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 md:p-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
              {/* Oval profile image */}
              <div className="shrink-0">
                <div className="relative" style={{ perspective: "800px" }}>
                  {/* Glow behind */}
                  <div
                    className="absolute -inset-3 rounded-[50%] opacity-50"
                    style={{
                      background: "conic-gradient(from 0deg, var(--accent), var(--accent-light), transparent, var(--accent))",
                      filter: "blur(18px)",
                    }}
                  />
                  {/* Gradient border */}
                  <div
                    className="absolute -inset-[3px] rounded-[50%]"
                    style={{
                      background: "linear-gradient(135deg, var(--accent), var(--accent-light), transparent, var(--accent))",
                      backgroundSize: "300% 300%",
                      animation: "gradient-shift 4s ease infinite",
                    }}
                  />
                  {/* Image */}
                  <div className="relative h-[200px] w-[160px] overflow-hidden rounded-[50%] bg-background sm:h-[230px] sm:w-[180px]">
                    <Image
                      src="/images/about-profile.jpeg"
                      alt="Hrang Kap Lian"
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="min-w-0 space-y-4 text-sm leading-[1.8] text-foreground sm:text-base sm:leading-[1.9] md:text-[17px]">
                <p className="text-justify">
                  An AI engineer and
                  software developer with a background in data science, machine learning, and algorithm
                  development. My work focuses on building intelligent systems that are not only technically
                  effective but also practical and meaningful in real-world environments.
                </p>
                <p className="text-justify">
                  I hold a <strong>Master of Engineering in Artificial Intelligence and Internet of Things (AIoT)</strong> from
                  the TAIST-Science Tokyo program at Kasetsart University, where my research focused on improving
                  the interpretability of machine learning models in high-dimensional data.
                </p>
                <p className="text-justify">
                  My current interests lie at the intersection of{" "}
                  <strong style={{ color: "var(--accent)" }}>Explainable AI</strong>,{" "}
                  <strong style={{ color: "var(--accent)" }}>human-AI decision making</strong>, and{" "}
                  <strong style={{ color: "var(--accent)" }}>socio-technical systems</strong>, particularly
                  how AI explanations translate into real actions within organisations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. SKILLS */}
        <section id="skills" className={sectionClass("skills")}>
          <SectionHeader title="Skills & Tech Stack" />
          <div className="grid gap-2 sm:grid-cols-2 sm:gap-3">
            {skillCategories.map((cat) => (
              <div
                key={cat.title}
                className={`rounded-2xl border border-border bg-surface p-4 sm:p-5 ${
                  cat.title === "Tools & Platforms" ? "sm:col-span-2" : ""
                }`}
              >
                <h3
                  className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.15em] sm:text-xs"
                  style={{ color: "var(--accent)" }}
                >
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {cat.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-border bg-background px-2 py-1 text-[11px] font-medium text-foreground sm:px-3 sm:py-1.5 sm:text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. EDUCATION */}
        <section id="education" className={sectionClass("education")}>
          <SectionHeader title="Education" />
          <div className="space-y-3 sm:space-y-4">
            {education.map((edu, i) => (
              <div key={i} className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-foreground sm:text-lg">{edu.degree}</h3>
                    <p className="text-xs text-muted sm:text-sm">{edu.school}</p>
                  </div>
                  {edu.gpa && (
                    <span
                      className="w-fit shrink-0 rounded-lg px-3 py-1 text-xs font-bold sm:text-sm"
                      style={{ backgroundColor: "var(--accent-glow)", color: "var(--accent)" }}
                    >
                      GPA {edu.gpa}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted sm:text-sm">{edu.details}</p>
                {edu.publication && (
                  <div className="mt-3 rounded-xl border-l-4 bg-accent/5 py-2.5 pl-4 pr-3" style={{ borderColor: "var(--accent)" }}>
                    <p className="text-[11px] font-medium text-muted sm:text-xs">{edu.publication}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CV */}
        <section id="cv" className={sectionClass("cv")}>
          <div className="flex flex-col items-center rounded-2xl border border-border bg-surface p-8 text-center sm:p-10 md:p-14">
            <div
              className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl sm:mb-6 sm:h-20 sm:w-20"
              style={{ backgroundColor: "var(--accent-glow)" }}
            >
              <svg className="h-8 w-8 sm:h-10 sm:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "var(--accent)" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-bold text-foreground sm:text-2xl md:text-3xl">Download My CV</h2>
            <p className="mx-auto mb-6 max-w-md text-xs text-muted sm:mb-8 sm:text-sm">
              Visitors can download my full academic and professional CV for more details about my background, research, and experience.
            </p>
            <Link
              href="/cv.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:scale-105 sm:px-8 sm:py-3.5"
              style={{ backgroundColor: "var(--accent)" }}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
