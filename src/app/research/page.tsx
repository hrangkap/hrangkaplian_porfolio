"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const researchInterests = [
  {
    title: "Explainable AI (XAI)",
    description:
      "Making machine learning models transparent and interpretable, enabling humans to understand and trust AI-driven decisions.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Clustering & Unsupervised Learning",
    description:
      "Developing methods to improve clustering quality and interpretability, particularly in high-dimensional data spaces.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    title: "Human-AI Decision Making",
    description:
      "Exploring how AI explanations translate into real actions within organisations and how humans interact with intelligent systems.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: "Dimensionality Reduction",
    description:
      "Selecting discriminative features from high-dimensional datasets to improve both model performance and interpretability.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
];

const publication = {
  title:
    "Discriminative Dimension Selection for Enhancing the Interpretability and Performance of Clustering Output",
  authors: [
    { name: "Hrang Kap Lian", affiliation: "Kasetsart University" },
    { name: "Kitsana Waiyamai", affiliation: "Kasetsart University" },
    { name: "Slavakis Konstantinos", affiliation: "Tokyo Institute of Technology" },
    { name: "Choochart Haruechaiyasak", affiliation: "NECTEC" },
  ],
  conference:
    "16th International Conference on Knowledge and Smart Technology (KST 2024)",
  location: "Krabi, Thailand",
  date: "28 February — 2 March 2024",
  pages: "178–183",
  doi: "10.1109/KST61284.2024.10499654",
  keywords: [
    "Unsupervised Learning",
    "K-means Clustering",
    "Discriminative Dimension Selection",
    "Overlap Cluster",
  ],
  abstract:
    "This paper proposes Discriminative Dimension Selection (DDS) which utilises overlapping clusters and dimensions to enhance the interpretability and performance of the K-means clustering algorithm. The method is evaluated across multiple datasets using validity indices including Silhouette Coefficient, Davies-Bouldin Index, and Calinski-Harabasz Index, demonstrating that the proposed Overlap-resolved Clustering approach improves results compared to traditional K-means.",
  ieeeUrl: "https://ieeexplore.ieee.org/document/10499654/",
};

const thesis = {
  title:
    "Improving Clustering Interpretability through Discriminative Dimension Selection in High-Dimensional Data",
  degree: "Master of Engineering (AI and IoT)",
  program: "TAIST-Science Tokyo Program, Kasetsart University",
  year: "2024",
};

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

function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function ResearchPage() {
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
            Academic Work
          </p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl min-[2000px]:text-8xl">
            Research &amp; <span className="gradient-text">Publications</span>
          </h1>
          <p className="max-w-2xl text-sm text-muted sm:text-base md:text-lg 2xl:max-w-3xl min-[2000px]:text-xl">
            My research focuses on making machine learning more interpretable and
            actionable, particularly in the areas of clustering, feature selection,
            and explainable AI.
          </p>
        </div>

        {/* Research Interests */}
        <AnimatedSection className="mb-12 sm:mb-16">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl 2xl:text-4xl min-[2000px]:text-5xl">
              Research Interests
            </h2>
            <div
              className="mt-2 h-0.5 w-12 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 min-[2000px]:gap-6">
            {researchInterests.map((interest) => (
              <div
                key={interest.title}
                className="group rounded-2xl border border-border bg-surface p-5 transition-all hover:border-accent/30 sm:p-6 min-[2000px]:p-8"
              >
                <div
                  className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl sm:h-12 sm:w-12 min-[2000px]:h-14 min-[2000px]:w-14"
                  style={{
                    backgroundColor: "var(--accent-glow)",
                    color: "var(--accent)",
                  }}
                >
                  {interest.icon}
                </div>
                <h3 className="mb-2 text-sm font-bold text-foreground sm:text-base min-[2000px]:text-lg">
                  {interest.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted sm:text-sm min-[2000px]:text-base">
                  {interest.description}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Publication */}
        <AnimatedSection className="mb-12 sm:mb-16">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl 2xl:text-4xl min-[2000px]:text-5xl">
              Publications
            </h2>
            <div
              className="mt-2 h-0.5 w-12 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
            />
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 md:p-8 min-[2000px]:p-10">
            {/* Conference badge */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span
                className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider sm:text-xs"
                style={{
                  backgroundColor: "var(--accent-glow)",
                  color: "var(--accent)",
                }}
              >
                Conference Paper
              </span>
              <span
                className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider sm:text-xs"
                style={{
                  backgroundColor: "var(--accent-glow)",
                  color: "var(--accent)",
                }}
              >
                IEEE
              </span>
            </div>

            {/* Title */}
            <h3 className="mb-3 text-base font-bold leading-snug text-foreground sm:text-lg md:text-xl min-[2000px]:text-2xl">
              {publication.title}
            </h3>

            {/* Authors */}
            <div className="mb-4 flex flex-wrap gap-x-1 text-xs text-muted sm:text-sm min-[2000px]:text-base">
              {publication.authors.map((author, i) => (
                <span key={author.name}>
                  <span
                    className={
                      author.name === "Hrang Kap Lian"
                        ? "font-semibold text-foreground"
                        : ""
                    }
                  >
                    {author.name}
                  </span>
                  {i < publication.authors.length - 1 && ",\u00A0"}
                </span>
              ))}
            </div>

            {/* Conference info */}
            <div className="mb-5 space-y-1.5 text-xs text-muted sm:text-sm min-[2000px]:text-base">
              <p>
                <span className="font-medium text-foreground">Conference:</span>{" "}
                {publication.conference}
              </p>
              <p>
                <span className="font-medium text-foreground">Location:</span>{" "}
                {publication.location} &middot; {publication.date}
              </p>
              <p>
                <span className="font-medium text-foreground">Pages:</span>{" "}
                {publication.pages}
              </p>
              <p>
                <span className="font-medium text-foreground">DOI:</span>{" "}
                <a
                  href={`https://doi.org/${publication.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                  style={{ color: "var(--accent)" }}
                >
                  {publication.doi}
                </a>
              </p>
            </div>

            {/* Abstract */}
            <div
              className="mb-5 rounded-xl border-l-4 bg-accent/5 py-3 pl-4 pr-3"
              style={{ borderColor: "var(--accent)" }}
            >
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-muted sm:text-xs">
                Abstract
              </p>
              <p className="text-xs leading-relaxed text-muted sm:text-sm min-[2000px]:text-base min-[2000px]:leading-relaxed">
                {publication.abstract}
              </p>
            </div>

            {/* Keywords */}
            <div className="mb-5">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted sm:text-xs">
                Keywords
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {publication.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="rounded-lg border border-border bg-background px-2 py-1 text-[10px] font-medium text-foreground sm:px-3 sm:py-1.5 sm:text-xs min-[2000px]:px-4 min-[2000px]:py-2 min-[2000px]:text-sm"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Link */}
            <a
              href={publication.ieeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glow inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold text-white transition-all hover:scale-105 sm:px-6 sm:py-3 sm:text-sm min-[2000px]:px-8 min-[2000px]:py-3.5 min-[2000px]:text-base"
              style={{ backgroundColor: "var(--accent)" }}
            >
              View on IEEE Xplore
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </AnimatedSection>

        {/* Thesis */}
        <AnimatedSection className="mb-12 sm:mb-16">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl 2xl:text-4xl min-[2000px]:text-5xl">
              Thesis
            </h2>
            <div
              className="mt-2 h-0.5 w-12 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
            />
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 md:p-8 min-[2000px]:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <span
                  className="mb-2 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider sm:text-xs"
                  style={{
                    backgroundColor: "var(--accent-glow)",
                    color: "var(--accent)",
                  }}
                >
                  {thesis.degree}
                </span>
                <h3 className="mt-2 text-base font-bold text-foreground sm:text-lg min-[2000px]:text-xl">
                  {thesis.title}
                </h3>
                <p className="mt-1 text-xs text-muted sm:text-sm min-[2000px]:text-base">
                  {thesis.program}
                </p>
              </div>
              <span
                className="w-fit shrink-0 rounded-lg px-3 py-1 text-xs font-bold sm:text-sm"
                style={{
                  backgroundColor: "var(--accent-glow)",
                  color: "var(--accent)",
                }}
              >
                {thesis.year}
              </span>
            </div>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection className="pb-16">
          <div className="flex flex-col items-center rounded-2xl border border-border bg-surface p-8 text-center sm:p-10 md:p-14 min-[2000px]:p-20">
            <div
              className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl sm:mb-6 sm:h-20 sm:w-20 min-[2000px]:h-24 min-[2000px]:w-24"
              style={{ backgroundColor: "var(--accent-glow)" }}
            >
              <svg
                className="h-8 w-8 sm:h-10 sm:w-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: "var(--accent)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-bold text-foreground sm:text-2xl md:text-3xl min-[2000px]:text-4xl">
              Interested in Collaboration?
            </h2>
            <p className="mx-auto mb-6 max-w-md text-xs text-muted sm:mb-8 sm:text-sm min-[2000px]:text-base min-[2000px]:max-w-lg">
              I&apos;m always open to discussing research ideas, potential collaborations,
              or opportunities in AI and machine learning.
            </p>
            <Link
              href="/contact"
              className="glow inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:scale-105 sm:px-8 sm:py-3.5 min-[2000px]:px-10 min-[2000px]:py-4 min-[2000px]:text-lg"
              style={{ backgroundColor: "var(--accent)" }}
            >
              Get In Touch
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </>
  );
}
