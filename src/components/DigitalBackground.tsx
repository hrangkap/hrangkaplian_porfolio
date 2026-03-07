"use client";

import { useEffect, useRef, useCallback } from "react";

interface TracePath {
  points: { x: number; y: number }[];
  endCircle: boolean;
  pulseOffset: number;
  pulseSpeed: number;
  drawProgress: number;
  drawn: boolean;
  colorIndex: number;
}

// Extra colors that complement the accent — teal, magenta, gold
const extraColors = [
  { r: 0, g: 210, b: 200 },   // teal/cyan
  { r: 200, g: 50, b: 180 },  // magenta/pink
  { r: 230, g: 180, b: 40 },  // gold/amber
];

export default function DigitalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const tracesRef = useRef<TracePath[]>([]);
  const timeRef = useRef(0);
  const initDoneRef = useRef(false);

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

  const buildTraces = useCallback((w: number, h: number) => {
    const cx = w * 0.3;
    const cy = h / 2;
    const chipW = 80;
    const chipH = 80;
    const traces: TracePath[] = [];

    // Helper to create a trace path with smooth bends
    const makePath = (
      startX: number,
      startY: number,
      directions: { dx: number; dy: number; len: number }[],
      endCircle: boolean
    ) => {
      const points: { x: number; y: number }[] = [{ x: startX, y: startY }];
      let px = startX;
      let py = startY;

      for (const d of directions) {
        px += d.dx * d.len;
        py += d.dy * d.len;
        points.push({ x: px, y: py });
      }

      traces.push({
        points,
        endCircle,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.4 + 0.2,
        drawProgress: 0,
        drawn: false,
        colorIndex: traces.length % 4, // 0 = accent, 1-3 = extra colors
      });
    };

    // Distance from chip edge to screen edges
    const toRight = w - (cx + chipW / 2) + 20;
    const toLeft = (cx - chipW / 2) + 20;
    const toTop = (cy - chipH / 2) + 20;
    const toBottom = h - (cy + chipH / 2) + 20;

    // === RIGHT side traces ===
    makePath(cx + chipW / 2, cy - 25, [
      { dx: 1, dy: 0, len: 40 },
      { dx: 1, dy: -1, len: 30 },
      { dx: 1, dy: 0, len: toRight * 0.4 },
      { dx: 1, dy: -1, len: 35 },
      { dx: 1, dy: 0, len: toRight * 0.5 },
    ], true);
    makePath(cx + chipW / 2, cy - 10, [
      { dx: 1, dy: 0, len: 50 },
      { dx: 1, dy: -1, len: 18 },
      { dx: 1, dy: 0, len: toRight * 0.5 },
      { dx: 1, dy: 1, len: 12 },
      { dx: 1, dy: 0, len: toRight * 0.4 },
    ], true);
    makePath(cx + chipW / 2, cy + 5, [
      { dx: 1, dy: 0, len: toRight * 0.35 },
      { dx: 1, dy: -1, len: 18 },
      { dx: 1, dy: 0, len: toRight * 0.6 },
    ], true);
    makePath(cx + chipW / 2, cy + 20, [
      { dx: 1, dy: 0, len: 45 },
      { dx: 1, dy: 1, len: 25 },
      { dx: 1, dy: 0, len: toRight * 0.45 },
      { dx: 1, dy: 1, len: 30 },
      { dx: 1, dy: 0, len: toRight * 0.4 },
    ], true);
    makePath(cx + chipW / 2, cy + 35, [
      { dx: 1, dy: 0, len: 30 },
      { dx: 1, dy: 1, len: 40 },
      { dx: 1, dy: 0, len: toRight * 0.7 },
    ], true);

    // === LEFT side traces ===
    makePath(cx - chipW / 2, cy - 25, [
      { dx: -1, dy: 0, len: 40 },
      { dx: -1, dy: -1, len: 30 },
      { dx: -1, dy: 0, len: toLeft * 0.5 },
      { dx: -1, dy: -1, len: 25 },
      { dx: -1, dy: 0, len: toLeft * 0.3 },
    ], true);
    makePath(cx - chipW / 2, cy - 10, [
      { dx: -1, dy: 0, len: 50 },
      { dx: -1, dy: -1, len: 18 },
      { dx: -1, dy: 0, len: toLeft * 0.6 },
    ], true);
    makePath(cx - chipW / 2, cy + 5, [
      { dx: -1, dy: 0, len: toLeft * 0.4 },
      { dx: -1, dy: 1, len: 15 },
      { dx: -1, dy: 0, len: toLeft * 0.5 },
    ], true);
    makePath(cx - chipW / 2, cy + 20, [
      { dx: -1, dy: 0, len: 40 },
      { dx: -1, dy: 1, len: 25 },
      { dx: -1, dy: 0, len: toLeft * 0.6 },
    ], true);
    makePath(cx - chipW / 2, cy + 35, [
      { dx: -1, dy: 0, len: 30 },
      { dx: -1, dy: 1, len: 35 },
      { dx: -1, dy: 0, len: toLeft * 0.4 },
    ], true);

    // === TOP traces ===
    makePath(cx - 25, cy - chipH / 2, [
      { dx: 0, dy: -1, len: 35 },
      { dx: -1, dy: -1, len: 25 },
      { dx: 0, dy: -1, len: toTop * 0.4 },
      { dx: -1, dy: -1, len: 20 },
      { dx: 0, dy: -1, len: toTop * 0.35 },
    ], true);
    makePath(cx - 8, cy - chipH / 2, [
      { dx: 0, dy: -1, len: 45 },
      { dx: 1, dy: -1, len: 12 },
      { dx: 0, dy: -1, len: toTop * 0.7 },
    ], true);
    makePath(cx + 10, cy - chipH / 2, [
      { dx: 0, dy: -1, len: 40 },
      { dx: 1, dy: -1, len: 30 },
      { dx: 0, dy: -1, len: toTop * 0.4 },
      { dx: 1, dy: -1, len: 20 },
      { dx: 0, dy: -1, len: toTop * 0.3 },
    ], true);
    makePath(cx + 25, cy - chipH / 2, [
      { dx: 0, dy: -1, len: 30 },
      { dx: 1, dy: -1, len: 35 },
      { dx: 0, dy: -1, len: toTop * 0.6 },
    ], true);

    // === BOTTOM traces ===
    makePath(cx - 25, cy + chipH / 2, [
      { dx: 0, dy: 1, len: 35 },
      { dx: -1, dy: 1, len: 30 },
      { dx: 0, dy: 1, len: toBottom * 0.4 },
      { dx: -1, dy: 1, len: 25 },
      { dx: 0, dy: 1, len: toBottom * 0.35 },
    ], true);
    makePath(cx - 8, cy + chipH / 2, [
      { dx: 0, dy: 1, len: 45 },
      { dx: 0, dy: 1, len: toBottom * 0.7 },
    ], true);
    makePath(cx + 10, cy + chipH / 2, [
      { dx: 0, dy: 1, len: 40 },
      { dx: 1, dy: 1, len: 35 },
      { dx: 0, dy: 1, len: toBottom * 0.55 },
    ], true);
    makePath(cx + 25, cy + chipH / 2, [
      { dx: 0, dy: 1, len: 30 },
      { dx: 1, dy: 1, len: 25 },
      { dx: 0, dy: 1, len: toBottom * 0.45 },
      { dx: 1, dy: 0, len: toRight * 0.3 },
    ], true);

    // Reset draw progress for animation
    for (const trace of traces) {
      trace.drawProgress = 0;
      trace.drawn = false;
    }

    tracesRef.current = traces;
    initDoneRef.current = false;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildTraces(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const getPathLength = (points: { x: number; y: number }[]) => {
      let len = 0;
      for (let i = 1; i < points.length; i++) {
        len += Math.sqrt((points[i].x - points[i - 1].x) ** 2 + (points[i].y - points[i - 1].y) ** 2);
      }
      return len;
    };

    const drawPath = (
      points: { x: number; y: number }[],
      progress: number // 0 to 1
    ) => {
      const totalLen = getPathLength(points);
      const targetLen = progress * totalLen;
      let walked = 0;

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length; i++) {
        const dx = points[i].x - points[i - 1].x;
        const dy = points[i].y - points[i - 1].y;
        const segLen = Math.sqrt(dx * dx + dy * dy);

        if (walked + segLen <= targetLen) {
          ctx.lineTo(points[i].x, points[i].y);
          walked += segLen;
        } else {
          const remain = targetLen - walked;
          const t = remain / segLen;
          ctx.lineTo(
            points[i - 1].x + dx * t,
            points[i - 1].y + dy * t
          );
          break;
        }
      }
    };

    const animate = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      timeRef.current += 0.016;
      const t = timeRef.current;

      const accent = getAccentColor();
      const rgb = hexToRgb(accent);
      const cx = width * 0.3;
      const cy = height / 2;
      const chipW = 80;
      const chipH = 80;

      // === Draw each trace ===
      for (const trace of tracesRef.current) {
        // Get trace color (0 = accent, 1-3 = extra colors)
        const tc = trace.colorIndex === 0
          ? rgb
          : extraColors[trace.colorIndex - 1];

        // Animate draw-in
        if (!trace.drawn) {
          trace.drawProgress = Math.min(1, trace.drawProgress + 0.008);
          if (trace.drawProgress >= 1) trace.drawn = true;
        }

        const totalLen = getPathLength(trace.points);
        const progress = trace.drawn ? 1 : trace.drawProgress;

        // Static trace line
        drawPath(trace.points, progress);
        ctx.strokeStyle = `rgba(${tc.r},${tc.g},${tc.b},0.3)`;
        ctx.lineWidth = 1.2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();

        // === Traveling glow pulse ===
        if (trace.drawn) {
          const pulsePos = ((t * trace.pulseSpeed + trace.pulseOffset) % 1);
          const pulseLen = 0.2;
          const pStart = pulsePos - pulseLen / 2;
          const pEnd = pulsePos + pulseLen / 2;

          // Draw glowing portion
          let walked = 0;
          for (let i = 1; i < trace.points.length; i++) {
            const p0 = trace.points[i - 1];
            const p1 = trace.points[i];
            const dx = p1.x - p0.x;
            const dy = p1.y - p0.y;
            const segLen = Math.sqrt(dx * dx + dy * dy);
            const segStart = walked / totalLen;
            const segEnd = (walked + segLen) / totalLen;

            if (segEnd > pStart && segStart < pEnd) {
              const clipS = Math.max(0, (pStart - segStart) / (segEnd - segStart));
              const clipE = Math.min(1, (pEnd - segStart) / (segEnd - segStart));

              const sx = p0.x + dx * clipS;
              const sy = p0.y + dy * clipS;
              const ex = p0.x + dx * clipE;
              const ey = p0.y + dy * clipE;

              const mid = (clipS + clipE) / 2;
              const midProgress = segStart + mid * (segEnd - segStart);
              const distFromCenter = Math.abs(midProgress - pulsePos) / (pulseLen / 2);
              const brightness = Math.max(0, 1 - distFromCenter);

              ctx.beginPath();
              ctx.moveTo(sx, sy);
              ctx.lineTo(ex, ey);

              const glowR = Math.min(255, tc.r + brightness * 80);
              const glowG = Math.min(255, tc.g + brightness * 60);
              const glowB = Math.min(255, tc.b + brightness * 40);

              ctx.strokeStyle = `rgba(${glowR},${glowG},${glowB},${brightness * 0.9})`;
              ctx.lineWidth = 1.5 + brightness * 2;
              ctx.shadowColor = `rgba(${glowR},${glowG},${glowB},${brightness * 0.6})`;
              ctx.shadowBlur = 12 + brightness * 10;
              ctx.stroke();
              ctx.shadowBlur = 0;
            }
            walked += segLen;
          }

          // Bright dot at pulse head
          const headDist = pulsePos * totalLen;
          let headWalked = 0;
          for (let i = 1; i < trace.points.length; i++) {
            const p0 = trace.points[i - 1];
            const p1 = trace.points[i];
            const dx = p1.x - p0.x;
            const dy = p1.y - p0.y;
            const segLen = Math.sqrt(dx * dx + dy * dy);

            if (headWalked + segLen >= headDist) {
              const tt = (headDist - headWalked) / segLen;
              const hx = p0.x + dx * tt;
              const hy = p0.y + dy * tt;

              const glow = ctx.createRadialGradient(hx, hy, 0, hx, hy, 15);
              glow.addColorStop(0, `rgba(255,255,255,0.5)`);
              glow.addColorStop(0.3, `rgba(${tc.r},${tc.g},${tc.b},0.4)`);
              glow.addColorStop(1, "transparent");
              ctx.fillStyle = glow;
              ctx.beginPath();
              ctx.arc(hx, hy, 15, 0, Math.PI * 2);
              ctx.fill();
              break;
            }
            headWalked += segLen;
          }
        }

        // === End circle node ===
        if (trace.endCircle && progress >= 1) {
          const last = trace.points[trace.points.length - 1];
          const pulse = 0.5 + 0.5 * Math.sin(t * 2 + trace.pulseOffset);

          // Outer ring
          ctx.beginPath();
          ctx.arc(last.x, last.y, 5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${tc.r},${tc.g},${tc.b},${0.3 + pulse * 0.2})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Inner filled dot
          ctx.beginPath();
          ctx.arc(last.x, last.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${tc.r},${tc.g},${tc.b},${0.4 + pulse * 0.3})`;
          ctx.fill();

          // Glow
          const ng = ctx.createRadialGradient(last.x, last.y, 0, last.x, last.y, 12);
          ng.addColorStop(0, `rgba(${tc.r},${tc.g},${tc.b},${0.15 + pulse * 0.1})`);
          ng.addColorStop(1, "transparent");
          ctx.fillStyle = ng;
          ctx.beginPath();
          ctx.arc(last.x, last.y, 12, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // === Central CPU chip ===
      const chipX = cx - chipW / 2;
      const chipY = cy - chipH / 2;

      // Chip glow
      const chipGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, chipW * 1.2);
      chipGlow.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},0.08)`);
      chipGlow.addColorStop(0.5, `rgba(${rgb.r},${rgb.g},${rgb.b},0.03)`);
      chipGlow.addColorStop(1, "transparent");
      ctx.fillStyle = chipGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, chipW * 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Chip body (dark filled rectangle)
      ctx.fillStyle = `rgba(0,0,0,0.7)`;
      ctx.fillRect(chipX, chipY, chipW, chipH);

      // Chip border
      const borderPulse = 0.4 + 0.3 * Math.sin(t * 1.5);
      ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${borderPulse})`;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = `rgba(${rgb.r},${rgb.g},${rgb.b},0.3)`;
      ctx.shadowBlur = 10;
      ctx.strokeRect(chipX, chipY, chipW, chipH);
      ctx.shadowBlur = 0;

      // Chip pins (small lines connecting chip edge to traces)
      const pinLength = 8;
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},0.3)`;

      // Right pins
      for (const yOff of [-25, -10, 5, 20, 35]) {
        ctx.beginPath();
        ctx.moveTo(cx + chipW / 2 - 2, cy + yOff);
        ctx.lineTo(cx + chipW / 2 + pinLength, cy + yOff);
        ctx.stroke();
      }
      // Left pins
      for (const yOff of [-25, -10, 5, 20, 35]) {
        ctx.beginPath();
        ctx.moveTo(cx - chipW / 2 + 2, cy + yOff);
        ctx.lineTo(cx - chipW / 2 - pinLength, cy + yOff);
        ctx.stroke();
      }
      // Top pins
      for (const xOff of [-25, -8, 10, 25]) {
        ctx.beginPath();
        ctx.moveTo(cx + xOff, cy - chipH / 2 + 2);
        ctx.lineTo(cx + xOff, cy - chipH / 2 - pinLength);
        ctx.stroke();
      }
      // Bottom pins
      for (const xOff of [-25, -8, 10, 25]) {
        ctx.beginPath();
        ctx.moveTo(cx + xOff, cy + chipH / 2 - 2);
        ctx.lineTo(cx + xOff, cy + chipH / 2 + pinLength);
        ctx.stroke();
      }

      // Corner accent glow on chip
      const corners = [
        [chipX, chipY],
        [chipX + chipW, chipY],
        [chipX, chipY + chipH],
        [chipX + chipW, chipY + chipH],
      ];
      for (let i = 0; i < corners.length; i++) {
        const [cornerX, cornerY] = corners[i];
        const cPulse = 0.3 + 0.3 * Math.sin(t * 2 + i * 1.5);
        const cg = ctx.createRadialGradient(cornerX, cornerY, 0, cornerX, cornerY, 20);
        cg.addColorStop(0, `rgba(${Math.min(255, rgb.r + 60)},${Math.min(255, rgb.g + 40)},${Math.min(255, rgb.b + 80)},${cPulse * 0.3})`);
        cg.addColorStop(1, "transparent");
        ctx.fillStyle = cg;
        ctx.beginPath();
        ctx.arc(cornerX, cornerY, 20, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [buildTraces, getAccentColor, hexToRgb]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.9 }}
    />
  );
}
