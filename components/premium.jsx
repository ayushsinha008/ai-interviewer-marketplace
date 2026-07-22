"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  animate,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  CursorSpotlight — global soft glow that follows the pointer        */
/* ------------------------------------------------------------------ */
export function CursorSpotlight() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 120, damping: 25, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 25, mass: 0.4 });

  useEffect(() => {
    if (reduce) return;
    // Only enable on devices with a fine pointer (mouse)
    if (!window.matchMedia?.("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 hidden lg:block"
      style={{
        background: `radial-gradient(600px circle at var(--cx) var(--cy), rgba(251,191,36,0.06), transparent 60%)`,
        ["--cx"]: sx,
        ["--cy"]: sy,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  ScrollProgress — thin gradient bar tracking scroll position       */
/* ------------------------------------------------------------------ */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600"
      style={{ scaleX }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal — fade + slide-up when scrolled into view                  */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
  as = "div",
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */
/*  Stagger — reveals children in sequence                            */
/* ------------------------------------------------------------------ */
export function Stagger({ children, className = "", gap = 0.08 }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "", y = 20 }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  MagneticButton — subtle pull toward the cursor on hover           */
/* ------------------------------------------------------------------ */
export function Magnetic({ children, className = "", strength = 0.35 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  if (reduce) return <span className={className}>{children}</span>;

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  SpotlightCard — cursor-follow highlight + gradient border glow    */
/* ------------------------------------------------------------------ */
export function SpotlightCard({
  children,
  className = "",
  as = "div",
  ...props
}) {
  const ref = useRef(null);
  const Tag = as;

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      className={`spotlight-card ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  AnimatedCounter — counts up from 0 when scrolled into view        */
/* ------------------------------------------------------------------ */
export function AnimatedCounter({
  value,
  duration = 1.6,
  className = "",
  suffix = "",
  prefix = "",
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  FloatingParticles — soft drifting dots for hero backgrounds       */
/* ------------------------------------------------------------------ */
export function FloatingParticles({ count = 18, className = "" }) {
  const reduce = useReducedMotion();
  const [dots, setDots] = useState([]);

  useEffect(() => {
    if (reduce) return;
    setDots(
      Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 10,
        opacity: 0.1 + Math.random() * 0.4,
      }))
    );
  }, [count, reduce]);

  if (reduce) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-amber-300"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            opacity: d.opacity,
          }}
          animate={{ y: [0, -30, 0], opacity: [d.opacity, d.opacity * 0.3, d.opacity] }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
