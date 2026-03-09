"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Profile3D from "@/components/Profile3D";

const stats = [
  { label: "Research Papers", value: "1+" },
  { label: "Years Experience", value: "3+" },
  { label: "Languages", value: "4" },
];

function ResponsiveProfile() {
  const [profileSize, setProfileSize] = useState<"lg" | "xl" | "2xl">("lg");

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 2000) setProfileSize("2xl");
      else if (w >= 1536) setProfileSize("xl");
      else setProfileSize("lg");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return <Profile3D size={profileSize} />;
}

export default function Home() {
  return (
    <section className="relative flex min-h-[calc(100vh-73px)] items-start overflow-hidden pt-6 sm:pt-10">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Large glow orb */}
        <div
          className="animate-pulse-ring absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, var(--accent-glow), transparent 70%)" }}
        />
        <div
          className="animate-pulse-ring absolute -bottom-48 -left-48 h-[500px] w-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, var(--accent-glow), transparent 70%)",
            animationDelay: "2s",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-6 sm:py-8 2xl:max-w-7xl min-[2000px]:max-w-[1600px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:items-center lg:gap-10 2xl:grid-cols-[1fr_440px] 2xl:gap-16 min-[2000px]:grid-cols-[1fr_500px] min-[2000px]:gap-20">
          {/* Left content */}
          <div className="min-w-0 rounded-2xl border border-border/30 bg-surface/10 p-6 backdrop-blur-[1px] sm:p-8 min-[2000px]:p-12">
            {/* Mobile profile - shown above text on small screens */}
            <div className="mb-10 flex justify-center lg:hidden">
              <div className="animate-fade-in-up">
                <Profile3D size="sm" />
              </div>
            </div>

            <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--accent)" }}
              />
              <span className="text-xs font-medium text-muted">
                Available for collaboration
              </span>
            </div>

            <h1 className="animate-fade-in-up animation-delay-200 mb-6 tracking-tight text-foreground">
              <span className="block text-xl font-medium leading-[1.3] sm:text-2xl md:text-3xl 2xl:text-4xl min-[2000px]:text-5xl">Hi, I&apos;m</span>
              <span className="gradient-text block whitespace-nowrap text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl min-[2000px]:text-8xl">Hrang Kap Lian</span>
            </h1>

            <p className="animate-fade-in-up animation-delay-400 mb-4 text-xl font-medium text-foreground sm:text-2xl 2xl:text-3xl min-[2000px]:text-4xl">
              AI/ML Engineer &amp; Researcher
            </p>

            <p className="animate-fade-in-up animation-delay-400 mb-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg 2xl:max-w-2xl 2xl:text-xl min-[2000px]:max-w-3xl min-[2000px]:text-2xl">
              with a passion for building{" "}
              <strong className="text-foreground">intelligent systems</strong> that are not only powerful but
              understandable. I enjoy working at the intersection of{" "}
              <strong className="text-foreground">technology</strong> and{" "}
              <strong className="text-foreground">human decision-making</strong>.
            </p>

            <div className="animate-fade-in-up animation-delay-600 mb-12 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/projects"
                className="glow inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 min-[2000px]:px-8 min-[2000px]:py-4 min-[2000px]:text-lg"
                style={{ backgroundColor: "var(--accent)" }}
              >
                View My Work
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold transition-all hover:border-accent hover:text-accent min-[2000px]:px-8 min-[2000px]:py-4 min-[2000px]:text-lg"
              >
                Get In Touch
              </Link>
            </div>

            {/* Stats */}
            <div className="animate-fade-in-up animation-delay-800 flex gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-glow text-2xl font-bold sm:text-3xl 2xl:text-4xl min-[2000px]:text-5xl"
                    style={{ color: "var(--accent)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - 3D profile */}
          <div className="hidden lg:flex lg:justify-center">
            <div className="animate-fade-in-up animation-delay-600">
              <ResponsiveProfile />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
