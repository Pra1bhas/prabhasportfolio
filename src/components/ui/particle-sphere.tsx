"use client";

import { useEffect, useRef } from "react";

type Props = { className?: string; particleCount?: number };

export default function ParticleSphere({ className, particleCount = 700 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Fibonacci sphere distribution
    const pts = Array.from({ length: particleCount }, (_, i) => {
      const k = i + 0.5;
      const phi = Math.acos(1 - (2 * k) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * k;
      return {
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
      };
    });

    let t = 0;
    const render = () => {
      t += 0.0035;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * 0.42;
      const cosA = Math.cos(t);
      const sinA = Math.sin(t);
      const tilt = 0.35;
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);

      for (const p of pts) {
        // rotate around Y
        const x1 = p.x * cosA - p.z * sinA;
        const z1 = p.x * sinA + p.z * cosA;
        // tilt around X
        const y1 = p.y * cosT - z1 * sinT;
        const z2 = p.y * sinT + z1 * cosT;

        const depth = (z2 + 1) / 2; // 0 back .. 1 front
        const size = 0.4 + depth * 1.4;
        const alpha = 0.08 + depth * 0.55;
        ctx.beginPath();
        ctx.arc(cx + x1 * r, cy + y1 * r, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [particleCount]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
