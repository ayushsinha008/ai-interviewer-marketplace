import { CodeDemo } from "@/components/demo-components-animate-code";
import { StarsBackgroundDemo } from "@/components/demo-components-backgrounds-stars";
import { AI_TAGS, AVATARS, LOGOS, ROLES, SLOTS } from "@/lib/data";
import {
  GoldTitle,
  GrayTitle,
  SectionHeading,
  SectionLabel,
} from "@/components/reusables";
import { Bot, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import PricingSection from "@/components/PricingSection";
import {
  Reveal,
  Stagger,
  StaggerItem,
  Magnetic,
  SpotlightCard,
  AnimatedCounter,
  FloatingParticles,
} from "@/components/premium";

function MockUI({ rows = 3 }) {
  const widths = ["w-4/5", "w-3/5", "w-2/5", "w-4/5", "w-1/2"];
  const colors = [
    "bg-white/5",
    "bg-white/5",
    "bg-amber-400/15",
    "bg-white/5",
    "bg-white/5",
  ];

  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-[#141417]">
      <div className="flex h-9 items-center gap-1.5 border-b border-white/10 bg-white/5 px-3.5">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex flex-col gap-2 p-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full ${widths[i]} ${colors[i]}`}
          />
        ))}
      </div>
    </div>
  );
}

export function BentoCard({ icon, title, desc, children, className = "" }) {
  return (
    <SpotlightCard
      className={`lift group relative h-full rounded-2xl border border-white/10 bg-[#0f0f11]/80 p-9 backdrop-blur-sm transition-colors duration-300 hover:border-amber-400/25 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-transparent" />

      <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/10 text-xl transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>

      <h3 className="mb-2 font-display text-xl font-semibold tracking-tight">
        {title}
      </h3>

      <p className="text-sm leading-relaxed text-stone-400">{desc}</p>

      {children}
    </SpotlightCard>
  );
}

const STATS = [
  { value: 2400, suffix: "+", label: "Engineers levelled up" },
  { value: 500, suffix: "+", label: "Expert interviewers" },
  { value: 12, suffix: "k+", label: "Mock interviews run" },
  { value: 92, suffix: "%", label: "Felt more confident" },
];

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden bg-black">
      {/* HERO */}
      <section className="relative grid min-h-screen grid-cols-1 overflow-hidden px-4 pb-20 pt-28 sm:px-8 sm:pt-32 lg:grid-cols-5">
        <StarsBackgroundDemo />
        <div className="aurora" aria-hidden />
        <FloatingParticles count={22} />

        {/* LEFT */}
        <div className="col-span-full flex flex-col items-center justify-center text-center lg:col-span-3 lg:-rotate-2">
          <Reveal delay={0}>
            <Badge variant="gold">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
              Powered by AI — Now in Beta
            </Badge>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="relative mt-6 max-w-4xl font-display text-5xl font-semibold tracking-tighter sm:text-6xl lg:text-7xl">
              <GrayTitle>Ace your next interview</GrayTitle>
              <br />
              <GoldTitle>with real experts</GoldTitle>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="relative mt-6 max-w-xl text-sm leading-relaxed text-stone-400 sm:text-base md:text-lg">
              Book 1:1 mock interviews with senior engineers from top companies.
              Get AI-powered feedback, role-specific questions, and the confidence
              to land your dream job.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="relative mt-10 flex justify-center gap-2 sm:w-auto sm:gap-4">
              <Magnetic>
                <Link href="/onboarding">
                  <Button variant="gold" size="hero">
                    Get started
                  </Button>
                </Link>
              </Magnetic>

              <Magnetic>
                <Link href="/explore">
                  <Button variant="outline" size="hero">
                    Browse Interviewers →
                  </Button>
                </Link>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="relative mt-8 flex items-center justify-center gap-3 sm:mt-16 sm:gap-4">
              <div className="flex">
                {AVATARS.map((av, i) => (
                  <div
                    key={i}
                    className={`h-8 w-8 overflow-hidden rounded-full border-2 border-[#0a0a0b] ${
                      i > 0 ? "-ml-2" : ""
                    }`}
                  >
                    <Image
                      src={av.src}
                      alt="user avatar"
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <p className="text-center text-sm text-stone-500 sm:text-left">
                <strong className="font-medium text-stone-400">
                  2,400+ engineers
                </strong>{" "}
                cracked FAANG interviews via Prept
              </p>
            </div>
          </Reveal>
        </div>

        {/* RIGHT */}
        <div className="col-span-full mt-12 flex items-center justify-center lg:col-span-2 lg:mt-0 lg:justify-start lg:rotate-3">
          <CodeDemo duration={30000} writing />
        </div>
      </section>

      {/* STATS BAND */}
      <section className="relative z-10 border-y border-white/10 bg-white/[0.015]">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <p className="font-display text-4xl font-bold tracking-tight text-gradient-gold sm:text-5xl">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-stone-500">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LOGOS */}
      <section className="relative z-10 border-b border-white/10 py-14">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-widest text-stone-600">
          Interviewees landed roles at
        </p>

        <div className="flex flex-wrap items-center justify-center gap-16 px-6 sm:gap-24">
          {LOGOS.map((l, i) => (
            <Reveal key={l.alt} delay={i * 0.05}>
              <Image
                src={l.src}
                alt={l.alt}
                width={50}
                height={50}
                className="h-6 w-auto opacity-50 grayscale transition-all duration-300 hover:opacity-90 hover:grayscale-0"
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-28">
        <Reveal className="mb-16 text-center">
          <SectionLabel>Features</SectionLabel>
          <SectionHeading
            gray="Everything you need,"
            gold="nothing you don't"
          />
        </Reveal>

        <div className="grid grid-cols-12 gap-4">
          <Reveal className="col-span-12 md:col-span-7" delay={0.05}>
            <BentoCard
              icon={<Bot size={20} className="text-amber-400" />}
              title={<GrayTitle>AI Question Generator</GrayTitle>}
              desc="Interviewers get a live AI co-pilot generating role-specific questions on demand — system design, behavioural, DSA — all tailored to the candidate's level."
            >
              <div className="mt-5 flex flex-wrap gap-2">
                {AI_TAGS.map((t) => (
                  <Badge key={t.label} variant={t.active ? "gold" : "outline"}>
                    {t.label}
                  </Badge>
                ))}
              </div>
            </BentoCard>
          </Reveal>

          <Reveal className="col-span-12 md:col-span-5" delay={0.1}>
            <BentoCard
              icon={<Wallet size={16} className="text-amber-400" />}
              title={<GrayTitle>Credit System</GrayTitle>}
              desc="Subscribe for monthly credits. Book sessions. Interviewers earn and withdraw any time."
            >
              <div className="mt-5 flex items-end justify-between rounded-xl border border-white/10 bg-[#141417] p-5">
                <div>
                  <p className="mb-1 text-xs text-stone-600">Your balance</p>
                  <p className="font-display text-4xl font-bold leading-none text-gradient-gold">
                    28
                  </p>
                  <p className="mt-1 text-xs text-stone-600">
                    credits remaining
                  </p>
                </div>

                <Badge variant="secondary">+10 this month</Badge>
              </div>
            </BentoCard>
          </Reveal>

          <Reveal className="col-span-12 md:col-span-4" delay={0.05}>
            <BentoCard
              icon="📹"
              title="HD Video Calls"
              desc="Powered by Stream. Screen sharing, recording, and instant playback links — all built in."
            >
              <MockUI rows={3} />
            </BentoCard>
          </Reveal>

          <Reveal className="col-span-12 md:col-span-4" delay={0.1}>
            <BentoCard
              icon="💬"
              title="Persistent Chat"
              desc="Message your interviewer before and after the call. Share resources, prep notes, and follow-ups in one thread."
            />
          </Reveal>

          <Reveal className="col-span-12 md:col-span-4" delay={0.15}>
            <BentoCard
              icon="🔒"
              title="Security by Arcjet"
              desc="Bot protection, rate limiting, and abuse prevention baked into every API route."
            />
          </Reveal>

          <Reveal className="col-span-12 md:col-span-6" delay={0.05}>
            <BentoCard
              icon="📊"
              title={<GrayTitle>AI Feedback Reports</GrayTitle>}
              desc="Post-interview analysis by Gemini with actionable insights."
            >
              <MockUI rows={5} />
            </BentoCard>
          </Reveal>

          <Reveal className="col-span-12 md:col-span-6" delay={0.1}>
            <BentoCard
              icon="🗓️"
              title={<GoldTitle>Slot-based Scheduling</GoldTitle>}
              desc="Interviewers set availability once. Interviewees pick from open slots and confirm with one click — no back-and-forth needed."
            >
              <div className="mt-5 flex flex-wrap gap-2">
                {SLOTS.map((s) => (
                  <span
                    key={s.label}
                    className={`rounded-lg border px-3 py-1.5 text-xs ${s.cls}`}
                  >
                    {s.label}
                  </span>
                ))}
              </div>
            </BentoCard>
          </Reveal>
        </div>
      </section>

      {/* ROLES */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-28">
        <Reveal className="mb-16 text-center">
          <SectionLabel>Who it&apos;s for</SectionLabel>
          <SectionHeading gray="Built for both sides" gold="of the table" />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {ROLES.map((role, i) => (
            <Reveal key={role.label} delay={i * 0.1}>
              <SpotlightCard className="lift relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f11]/80 p-12 backdrop-blur-sm transition-colors duration-300 hover:border-amber-400/25">
                <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.06)_0%,transparent_70%)]" />

                <span className="mb-5 inline-block rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400">
                  {role.label}
                </span>

                <h3 className="mb-4 font-display text-2xl font-semibold tracking-tight">
                  {role.title}
                </h3>

                <p className="mb-8 text-sm leading-relaxed text-stone-400">
                  {role.desc}
                </p>

                <ul className="space-y-3">
                  {role.perks.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-stone-400">
                      <span className="mt-0.5 flex h-4 min-w-4 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/10 text-xs text-amber-400">
                        ✓
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-28">
        <Reveal className="mb-16 text-center">
          <SectionLabel>Pricing</SectionLabel>
          <SectionHeading
            gray="Simple, transparent"
            gold="credit-based plans"
          />
          <p className="mt-3 text-sm text-stone-400">
            Each credit = one session. Unused credits roll over.
          </p>
        </Reveal>

        <PricingSection />
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-28">
        <Reveal>
          <div className="gradient-border relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400/5 to-transparent px-3 py-20 text-center sm:px-16">
            <StarsBackgroundDemo />
            <FloatingParticles count={14} />

            <h2 className="relative mb-4 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              <GrayTitle>Your next interview</GrayTitle>
              <br />
              <GoldTitle>starts here</GoldTitle>
            </h2>

            <p className="relative mb-11 text-sm font-light text-stone-400">
              Join thousands of engineers already levelling up on Prept.
            </p>

            <div className="relative flex flex-col justify-center gap-4 sm:flex-row">
              <Magnetic>
                <Link href="/onboarding">
                  <Button variant="gold" size="hero">
                    Get started
                  </Button>
                </Link>
              </Magnetic>

              <Magnetic>
                <Link href="/explore">
                  <Button variant="outline" size="hero">
                    Browse Interviewers →
                  </Button>
                </Link>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
