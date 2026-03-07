"use client";

import { useState } from "react";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/hrangkap",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/hrangkaplian",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Google Scholar",
    href: "https://scholar.google.com",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 100 14 7 7 0 000-14z" />
      </svg>
    ),
  },
];

const contactInfo = [
  {
    label: "Email",
    value: "hrangkaplian.edu@gmail.com",
    href: "mailto:hrangkaplian.edu@gmail.com",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Bangkok, Thailand",
    href: null,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate send — replace with actual API call later
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[1] bg-background/70" />

      <div className="relative z-[2] mx-auto max-w-5xl px-5 sm:px-8">
        {/* Header */}
        <div className="pt-16 pb-10 sm:pt-24 sm:pb-14">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] sm:text-sm"
            style={{ color: "var(--accent)" }}
          >
            Let&apos;s Connect
          </p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="max-w-2xl text-sm text-muted sm:text-base md:text-lg">
            Whether you have a question, a collaboration idea, or just want to say hello — I&apos;d love to hear from you.
          </p>
        </div>

        {/* Content */}
        <div className="grid gap-6 pb-16 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
          {/* Left — Info & Links */}
          <div className="space-y-4 sm:space-y-5">
            {/* Contact details */}
            <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
              <h2
                className="mb-4 text-[10px] font-bold uppercase tracking-[0.15em] sm:text-xs"
                style={{ color: "var(--accent)" }}
              >
                Contact Info
              </h2>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: "var(--accent-glow)", color: "var(--accent)" }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-muted sm:text-xs">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-medium text-foreground transition-colors hover:text-accent sm:text-base"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-foreground sm:text-base">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
              <h2
                className="mb-4 text-[10px] font-bold uppercase tracking-[0.15em] sm:text-xs"
                style={{ color: "var(--accent)" }}
              >
                Find Me Online
              </h2>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.label}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background text-muted transition-all hover:scale-105 hover:border-accent hover:text-accent sm:h-12 sm:w-12"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">Open to opportunities</p>
                  
                  <p className="text-xs text-muted">
                    Available for full-time roles, research collaborations, and innovative projects.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6 md:p-8">
            <h2
              className="mb-5 text-[10px] font-bold uppercase tracking-[0.15em] sm:mb-6 sm:text-xs"
              style={{ color: "var(--accent)" }}
            >
              Send a Message
            </h2>

            {status === "sent" ? (
              <div className="flex flex-col items-center py-10 text-center sm:py-14">
                <div
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl sm:h-16 sm:w-16"
                  style={{ backgroundColor: "var(--accent-glow)" }}
                >
                  <svg className="h-7 w-7 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "var(--accent)" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground sm:text-xl">Message Sent!</h3>
                <p className="mb-6 max-w-sm text-xs text-muted sm:text-sm">
                  Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm font-medium transition-colors hover:text-foreground"
                  style={{ color: "var(--accent)" }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-[11px] font-medium text-muted sm:text-xs">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-accent sm:py-3"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-[11px] font-medium text-muted sm:text-xs">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-accent sm:py-3"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="mb-1.5 block text-[11px] font-medium text-muted sm:text-xs">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-accent sm:py-3"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-[11px] font-medium text-muted sm:text-xs">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-accent sm:py-3"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="glow inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-60 sm:w-auto sm:py-3.5"
                  style={{ backgroundColor: "var(--accent)" }}
                >
                  {status === "sending" ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
