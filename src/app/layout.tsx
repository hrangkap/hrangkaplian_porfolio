import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeCustomizer from "@/components/ThemeCustomizer";
import BackgroundRenderer from "@/components/BackgroundRenderer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hrang Kap Lian | Algorithm Engineer & AI Researcher",
  description:
    "Portfolio of Hrang Kap Lian — Algorithm Engineer specializing in Explainable AI, human-AI decision-making, and socio-technical systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <BackgroundRenderer />
          <Navbar />
          <main className="relative z-10 min-h-screen pt-[73px]">{children}</main>
          <Footer />
          <ThemeCustomizer />
        </ThemeProvider>
      </body>
    </html>
  );
}
