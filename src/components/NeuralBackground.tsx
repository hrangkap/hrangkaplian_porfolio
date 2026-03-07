"use client";

import { useEffect, useRef, useCallback } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  pulseSpeed: number;
}

const CONNECTION_DISTANCE = 150;
const NODE_COUNT_FACTOR = 0.00008; // nodes per pixel area
const MIN_NODES = 30;
const MAX_NODES = 80;

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  const getAccentColor = useCallback(() => {
    const style = getComputedStyle(document.documentElement);
    return style.getPropertyValue("--accent").trim() || "#2563eb";
  }, []);

  const hexToRgb = useCallback((hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
      : { r: 37, g: 99, b: 235 };
  }, []);

  const initNodes = useCallback((width: number, height: number) => {
    const area = width * height;
    const count = Math.min(MAX_NODES, Math.max(MIN_NODES, Math.floor(area * NODE_COUNT_FACTOR)));
    const nodes: Node[] = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }
    return nodes;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      nodesRef.current = initNodes(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouseRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const accent = getAccentColor();
      const rgb = hexToRgb(accent);
      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      const time = Date.now();

      // Update and draw nodes
      for (const node of nodes) {
        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Clamp position
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));

        // Mouse interaction — gentle attraction
        if (mouse) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200 && dist > 0) {
            const force = 0.02 * (1 - dist / 200);
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;
          }
        }

        // Speed damping
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > 0.8) {
          node.vx *= 0.98;
          node.vy *= 0.98;
        }

        // Pulse
        node.pulsePhase += node.pulseSpeed;
        const pulse = 0.5 + 0.5 * Math.sin(node.pulsePhase);
        const currentRadius = node.radius + pulse * 1;

        // Draw node glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, currentRadius * 6
        );
        gradient.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.3 + pulse * 0.2})`);
        gradient.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius * 6, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${0.6 + pulse * 0.4})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.25;

            // Animated dash effect
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${opacity})`;
            ctx.lineWidth = 0.5 + (1 - dist / CONNECTION_DISTANCE) * 0.5;

            // Glow on close connections
            if (dist < CONNECTION_DISTANCE * 0.4) {
              ctx.shadowColor = `rgba(${rgb.r},${rgb.g},${rgb.b},0.3)`;
              ctx.shadowBlur = 6;
            } else {
              ctx.shadowBlur = 0;
            }

            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }

        // Draw connections to mouse
        if (mouse) {
          const dx = nodes[i].x - mouse.x;
          const dy = nodes[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE * 1.5) {
            const opacity = (1 - dist / (CONNECTION_DISTANCE * 1.5)) * 0.4;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.shadowColor = `rgba(${rgb.r},${rgb.g},${rgb.b},0.4)`;
            ctx.shadowBlur = 8;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }

      // Occasional signal pulse traveling along connections
      const pulseTime = (time % 4000) / 4000;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE * 0.6 && (i + j) % 7 === 0) {
            const px = nodes[i].x + (nodes[j].x - nodes[i].x) * pulseTime;
            const py = nodes[i].y + (nodes[j].y - nodes[i].y) * pulseTime;

            const pulseGradient = ctx.createRadialGradient(px, py, 0, px, py, 4);
            pulseGradient.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},0.8)`);
            pulseGradient.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.fillStyle = pulseGradient;
            ctx.fill();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initNodes, getAccentColor, hexToRgb]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto fixed inset-0 z-0"
      style={{ opacity: 0.7 }}
    />
  );
}
