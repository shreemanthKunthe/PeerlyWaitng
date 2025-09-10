import { useEffect, useRef } from "react";

interface Props {
  className?: string;
  color?: string; // rgba color
  speed?: number; // base speed
  density?: number; // particles per 10k px^2
}

export default function Particles({
  className,
  color = "rgba(255,255,255,0.35)",
  speed = 0.15,
  density = 0.035,
}: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const DPR = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number; aj: number };
    let particles: P[] = [];

    const seed = (n: number) => {
      particles = new Array(n).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: Math.random() * 1.8 + 0.4,
        a: Math.random() * 0.6 + 0.2,
        aj: (Math.random() * 2 - 1) * 0.003,
      }));
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * DPR);
      canvas.height = Math.floor(height * DPR);
      ctx.scale(DPR, DPR);
      const target = Math.min(140, Math.max(24, Math.floor((width * height) / 10000 * density)));
      seed(target);
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        // motion
        p.x += p.vx;
        p.y += p.vy;
        p.a += p.aj;
        if (p.a < 0.15 || p.a > 0.8) p.aj *= -1;

        // wrap
        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;
        if (p.y < -5) p.y = height + 5;
        if (p.y > height + 5) p.y = -5;

        // draw
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.globalAlpha = p.a;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(step);
    };

    resize();
    step();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [color, density, speed]);

  return <canvas ref={ref} className={className} />;
}
