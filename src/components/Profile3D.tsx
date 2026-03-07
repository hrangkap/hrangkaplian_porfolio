"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";

interface Profile3DProps {
  size?: "sm" | "lg";
}

const sizes = {
  sm: { width: 220, height: 280, ring: 260 },
  lg: { width: 320, height: 420, ring: 360 },
};

export default function Profile3D({ size = "lg" }: Profile3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const { width, height, ring } = sizes[size];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 15;
    const rotateX = ((centerY - e.clientY) / (rect.height / 2)) * 15;

    setRotation({ x: rotateX, y: rotateY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isHovering ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glow ring behind image */}
        <div
          className="absolute -inset-4 rounded-3xl opacity-60"
          style={{
            background: `conic-gradient(from 0deg, var(--accent), var(--accent-light), transparent, var(--accent))`,
            filter: "blur(20px)",
            transform: "translateZ(-20px)",
          }}
        />

        {/* Outer border frame */}
        <div
          className="absolute -inset-[2px] rounded-2xl"
          style={{
            background: `linear-gradient(135deg, var(--accent), var(--accent-light), transparent, var(--accent))`,
            backgroundSize: "300% 300%",
            animation: "gradient-shift 4s ease infinite",
          }}
        />

        {/* Image container */}
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-background">
          <Image
            src="/images/profile-1.jpeg"
            alt="Hrang Kap Lian"
            fill
            className="object-cover object-top"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, var(--background) 0%, transparent 30%)`,
            }}
          />
        </div>

        {/* Floating accent decorations */}
        <div
          className="absolute -right-4 top-6 h-2.5 w-2.5 rounded-full"
          style={{
            backgroundColor: "var(--accent)",
            boxShadow: "0 0 12px var(--accent-glow)",
            transform: "translateZ(40px)",
            animation: "float 3s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -left-3 bottom-20 h-2 w-2 rounded-full"
          style={{
            backgroundColor: "var(--accent-light)",
            boxShadow: "0 0 10px var(--accent-glow)",
            transform: "translateZ(30px)",
            animation: "float 4s ease-in-out infinite 1s",
          }}
        />

        {/* Orbiting ring */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: `${ring}px`,
            height: `${ring}px`,
            border: "1px solid var(--accent)",
            borderRadius: "50%",
            opacity: 0.15,
            transform: `translateZ(30px) rotateX(${60 + rotation.x * 0.5}deg) rotateY(${rotation.y * 0.5}deg)`,
            transition: isHovering ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
          }}
        />
      </div>
    </div>
  );
}
