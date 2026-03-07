import Link from "next/link";
import Profile3D from "@/components/Profile3D";

const stats = [
  { label: "Research Papers", value: "1+" },
  { label: "Years Experience", value: "2+" },
  { label: "Languages", value: "3" },
];

export default function Home() {
  return (
    <section className="relative flex min-h-[calc(100vh-73px)] items-center overflow-hidden">
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

      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:items-center lg:gap-10">
          {/* Left content */}
          <div className="min-w-0 rounded-2xl border border-border/30 bg-surface/10 p-6 backdrop-blur-[1px] sm:p-8">
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

            <h1 className="animate-fade-in-up animation-delay-200 mb-6 leading-[1.1] tracking-tight">
              <span className="text-xl font-medium sm:text-2xl md:text-3xl">Hi, I&apos;m</span>{" "}
              <span className="gradient-text text-3xl font-bold sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">Hrang Kap Lian</span>
            </h1>

            <p className="animate-fade-in-up animation-delay-400 mb-4 text-xl font-medium text-foreground sm:text-2xl">
              AI/ML Engineer &amp; Researcher
            </p>

            <p className="animate-fade-in-up animation-delay-400 mb-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              with a passion for building{" "}
              <strong className="text-foreground">intelligent systems</strong> that are not only powerful but
              understandable. I enjoy working at the intersection of{" "}
              <strong className="text-foreground">technology</strong> and{" "}
              <strong className="text-foreground">human decision-making</strong>.
            </p>

            <div className="animate-fade-in-up animation-delay-600 mb-12 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/projects"
                className="glow inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105"
                style={{ backgroundColor: "var(--accent)" }}
              >
                View My Work
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold transition-all hover:border-accent hover:text-accent"
              >
                Get In Touch
              </Link>
            </div>

            {/* Stats */}
            <div className="animate-fade-in-up animation-delay-800 flex gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-glow text-2xl font-bold sm:text-3xl"
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
              <Profile3D />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
