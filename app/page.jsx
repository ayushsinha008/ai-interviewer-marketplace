import HeroPreview from "@/components/HeroPreview";
import { StarsBackgroundDemo } from "@/components/demo-components-backgrounds-stars";
import { AI_TAGS, AVATARS, LOGOS, ROLES, SLOTS } from "@/lib/data";
import {
  GoldTitle,
  GrayTitle,
  SectionHeading,
  SectionLabel,
} from "@/components/reusables";
import {
  Sparkles,
  Wallet,
  Video,
  MessageSquare,
  ShieldCheck,
  BarChart3,
  CalendarClock,
  Search,
  ArrowRight,
  Check,
  Star,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import PricingSection from "@/components/PricingSection";
import {
  Reveal,
  Magnetic,
  SpotlightCard,
  AnimatedCounter,
  FloatingParticles,
} from "@/components/premium";

/* -------------------------------------------------------------------------- */
/*  Data                                                                       */
/* -------------------------------------------------------------------------- */

const STATS = [
  { value: 2400, suffix: "+", label: "Engineers levelled up" },
  { value: 500, suffix: "+", label: "Expert interviewers" },
  { value: 12, suffix: "k+", label: "Mock interviews run" },
  { value: 92, suffix: "%", label: "Felt more confident" },
];

const STEPS = [
  {
    icon: Search,
    title: "Pick your role & interviewer",
    desc: "Browse 500+ vetted senior engineers from FAANG and top startups. Filter by role, stack, and seniority.",
  },
  {
    icon: Video,
    title: "Book a live 1:1 session",
    desc: "Choose an open slot and meet over crystal-clear HD video with screen share and a real-time AI co-pilot.",
  },
  {
    icon: BarChart3,
    title: "Get AI feedback & improve",
    desc: "Receive a Gemini-powered report with scores, strengths, and a focused action plan for next time.",
  },
];

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Question Generator",
    desc: "A live co-pilot surfaces role-specific questions on demand — system design, behavioural, DSA — tuned to the candidate's level.",
    accent: "tags",
  },
  {
    icon: Wallet,
    title: "Credit System",
    desc: "Subscribe for monthly credits, book sessions, and let interviewers earn and withdraw any time.",
    accent: "balance",
  },
  {
    icon: Video,
    title: "HD Video Calls",
    desc: "Powered by Stream. Screen sharing, recording, and instant playback links — all built in.",
  },
  {
    icon: MessageSquare,
    title: "Persistent Chat",
    desc: "Message your interviewer before and after the call. Share resources and follow-ups in one thread.",
  },
  {
    icon: ShieldCheck,
    title: "Security by Arcjet",
    desc: "Bot protection, rate limiting, and abuse prevention baked into every single API route.",
  },
  {
    icon: CalendarClock,
    title: "Slot-based Scheduling",
    desc: "Interviewers set availability once. Candidates confirm a slot in one click — no back-and-forth.",
    accent: "slots",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "The AI feedback pinpointed exactly where my system design answers fell apart. Two weeks later I had a Google offer.",
    name: "Ananya Rao",
    role: "SWE II · Google",
  },
  {
    quote:
      "Practising with an actual staff engineer — not a chatbot — is the difference. The mock felt tougher than my real onsite.",
    name: "Marcus Bell",
    role: "Backend Engineer · Stripe",
  },
  {
    quote:
      "As an interviewer I earn on my own schedule, and the co-pilot means I never run out of sharp follow-ups.",
    name: "Priya Nair",
    role: "Principal Engineer · Meta",
  },
];

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                      */
/* -------------------------------------------------------------------------- */

function FloatingChip({ className = "", children }) {
  return (
    <div
      className={`glass animate-float pointer-events-none absolute z-20 hidden items-center gap-2.5 rounded-2xl border border-white/10 px-4 py-3 shadow-[0_16px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl lg:flex ${className}`}
    >
      {children}
    </div>
  );
}

function FeatureCard({ feature }) {
  const Icon = feature.icon;
  return (
    <SpotlightCard className="lift group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0f0f11]/70 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-emerald-400/30">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
        <Icon size={20} />
      </span>

      <h3 className="mb-2.5 font-display text-lg font-semibold tracking-tight text-stone-100">
        {feature.title}
      </h3>
      <p className="text-sm leading-relaxed text-stone-400">{feature.desc}</p>

      {feature.accent === "tags" && (
        <div className="mt-6 flex flex-wrap gap-2">
          {AI_TAGS.map((t) => (
            <Badge key={t.label} variant={t.active ? "gold" : "outline"}>
              {t.label}
            </Badge>
          ))}
        </div>
      )}

      {feature.accent === "balance" && (
        <div className="mt-6 flex items-end justify-between rounded-2xl border border-white/10 bg-[#141417] p-4">
          <div>
            <p className="mb-1 text-[11px] text-stone-600">Your balance</p>
            <p className="font-display text-3xl font-bold leading-none text-gradient-gold">
              28
            </p>
          </div>
          <Badge variant="secondary">+10 / mo</Badge>
        </div>
      )}

      {feature.accent === "slots" && (
        <div className="mt-6 flex flex-wrap gap-2">
          {SLOTS.map((s) => (
            <span
              key={s.label}
              className={`rounded-lg border px-2.5 py-1 text-[11px] ${s.cls}`}
            >
              {s.label}
            </span>
          ))}
        </div>
      )}
    </SpotlightCard>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden bg-black">
      {/* ============================ HERO ============================ */}
      <section className="relative flex min-h-screen flex-col items-center overflow-hidden px-4 pb-24 pt-32 text-center sm:px-8 sm:pt-40">
        <div className="bg-grid absolute inset-0" aria-hidden />
        <StarsBackgroundDemo />
        <FloatingParticles count={18} />
        {/* Rich mesh-gradient depth */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="animate-float absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.24),transparent_65%)] blur-3xl" />
          <div className="animate-float absolute -right-40 -top-24 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.18),transparent_65%)] blur-3xl [animation-delay:-3s]" />
          <div className="absolute left-1/2 top-1/3 h-[620px] w-[960px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(20,184,166,0.14),transparent_70%)] blur-3xl" />
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black"
          aria-hidden
        />

        <div className="relative z-10 flex w-full max-w-4xl flex-col items-center">
          <Reveal>
            <Badge variant="gold">
              <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Powered by AI — Now in Beta
            </Badge>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-7 font-display text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
              <GrayTitle>Ace your next interview</GrayTitle>
              <br />
              <span className="text-stone-100">with </span>
              <GoldTitle>real experts</GoldTitle>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-stone-400 md:text-lg">
              Book 1:1 mock interviews with senior engineers from top companies.
              Get AI-powered feedback, role-specific questions, and the
              confidence to land your dream job.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Magnetic>
                <Link href="/onboarding">
                  <Button variant="gold" size="hero">
                    Get started <ArrowRight size={18} />
                  </Button>
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/explore">
                  <Button variant="outline" size="hero">
                    Browse Interviewers
                  </Button>
                </Link>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-10 flex items-center justify-center gap-3">
              <div className="flex">
                {AVATARS.map((av, i) => (
                  <div
                    key={i}
                    className={`h-9 w-9 overflow-hidden rounded-full border-2 border-[#0a0a0b] ${
                      i > 0 ? "-ml-2.5" : ""
                    }`}
                  >
                    <Image
                      src={av.src}
                      alt="user avatar"
                      width={36}
                      height={36}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-left text-sm text-stone-500">
                <strong className="font-medium text-stone-300">
                  2,400+ engineers
                </strong>{" "}
                cracked FAANG interviews via Prept
              </p>
            </div>
          </Reveal>
        </div>

        {/* Centered product preview */}
        <Reveal delay={0.4} className="relative z-10 mt-20 w-full max-w-3xl">
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-x-16 -top-10 bottom-0 bg-[radial-gradient(55%_60%_at_50%_0%,rgba(16,185,129,0.28),transparent_70%)] blur-2xl"
              aria-hidden
            />

            <FloatingChip className="-left-6 top-20 [animation-delay:-2s]">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300">
                <Check size={16} />
              </span>
              <div className="text-left">
                <p className="text-[11px] text-stone-500">Feedback ready</p>
                <p className="font-display text-sm font-semibold text-stone-100">
                  92% · Strong
                </p>
              </div>
            </FloatingChip>

            <FloatingChip className="-right-6 bottom-24 [animation-delay:-4s]">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300">
                <Star size={16} className="fill-emerald-300" />
              </span>
              <div className="text-left">
                <p className="text-[11px] text-stone-500">Session rating</p>
                <p className="font-display text-sm font-semibold text-stone-100">
                  4.9 / 5.0
                </p>
              </div>
            </FloatingChip>

            <HeroPreview />
          </div>
        </Reveal>
      </section>

      {/* ============================ LOGOS ============================ */}
      <section className="relative z-10 border-y border-white/10 bg-white/[0.015] py-12">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-stone-600">
          Interviewees landed roles at
        </p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-20 px-10">
            {[...LOGOS, ...LOGOS].map((l, i) => (
              <Image
                key={i}
                src={l.src}
                alt={l.alt}
                width={50}
                height={50}
                className="h-6 w-auto opacity-45 grayscale transition-all duration-300 hover:opacity-90 hover:grayscale-0"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================ STATS ============================ */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="glass lift rounded-3xl border border-white/10 p-8 text-center">
                <p className="font-display text-4xl font-bold tracking-tight text-gradient-gold sm:text-5xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-wider text-stone-500">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========================= HOW IT WORKS ========================= */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-28">
        <Reveal className="mb-16 text-center">
          <SectionLabel>How it works</SectionLabel>
          <SectionHeading gray="From nervous to" gold="job-ready in 3 steps" />
        </Reveal>

        <div className="relative grid gap-6 md:grid-cols-3">
          <div
            className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block"
            aria-hidden
          />
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={i * 0.12}>
                <div className="glass lift relative h-full rounded-3xl border border-white/10 p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                      <Icon size={24} />
                    </span>
                    <span className="font-display text-5xl font-bold leading-none text-white/5">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mb-2.5 font-display text-xl font-semibold tracking-tight text-stone-100">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-stone-400">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============================ FEATURES ============================ */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-28">
        <Reveal className="mb-16 text-center">
          <SectionLabel>Features</SectionLabel>
          <SectionHeading gray="Everything you need," gold="nothing you don't" />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.08}>
              <FeatureCard feature={f} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================ ROLES ============================ */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-28">
        <Reveal className="mb-16 text-center">
          <SectionLabel>Who it&apos;s for</SectionLabel>
          <SectionHeading gray="Built for both sides" gold="of the table" />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {ROLES.map((role, i) => (
            <Reveal key={role.label} delay={i * 0.1}>
              <SpotlightCard className="lift group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#0f0f11]/70 p-10 backdrop-blur-sm transition-colors duration-300 hover:border-emerald-400/30 sm:p-12">
                <div
                  className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(16, 185, 129,0.12)_0%,transparent_70%)]"
                  aria-hidden
                />
                <span className="mb-6 inline-flex w-fit items-center rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
                  {role.label}
                </span>
                <h3 className="mb-4 font-display text-2xl font-semibold tracking-tight text-stone-100 sm:text-3xl">
                  {role.title}
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-stone-400">
                  {role.desc}
                </p>
                <ul className="mt-auto space-y-3.5">
                  {role.perks.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 text-sm text-stone-300"
                    >
                      <span className="mt-0.5 flex h-5 min-w-5 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                        <Check size={12} />
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

      {/* ========================= TESTIMONIALS ========================= */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-28">
        <Reveal className="mb-16 text-center">
          <SectionLabel>Loved by candidates</SectionLabel>
          <SectionHeading gray="Real prep." gold="Real offers." />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className="glass lift relative flex h-full flex-col rounded-3xl border border-white/10 p-8">
                <Quote
                  size={28}
                  className="mb-5 text-emerald-400/40"
                  aria-hidden
                />
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      size={14}
                      className="fill-emerald-400 text-emerald-400"
                    />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-stone-300">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/8 pt-5">
                  <div className="h-10 w-10 overflow-hidden rounded-full border border-white/10">
                    <Image
                      src={AVATARS[i % AVATARS.length].src}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-stone-100">
                      {t.name}
                    </p>
                    <p className="text-xs text-stone-500">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============================ PRICING ============================ */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-28">
        <Reveal className="mb-16 text-center">
          <SectionLabel>Pricing</SectionLabel>
          <SectionHeading gray="Simple, transparent" gold="credit-based plans" />
          <p className="mt-4 text-sm text-stone-400">
            Each credit = one session. Unused credits roll over.
          </p>
        </Reveal>

        <PricingSection />
      </section>

      {/* ============================ CTA ============================ */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-28">
        <Reveal>
          <div className="gradient-border relative overflow-hidden rounded-[32px] bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-400/5 px-6 py-24 text-center sm:px-16">
            <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
            <StarsBackgroundDemo />
            <FloatingParticles count={14} />

            <h2 className="relative mb-5 font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              <GrayTitle>Your next interview</GrayTitle>
              <br />
              <GoldTitle>starts here</GoldTitle>
            </h2>

            <p className="relative mb-11 text-sm text-stone-400 md:text-base">
              Join thousands of engineers already levelling up on Prept.
            </p>

            <div className="relative flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              <Magnetic>
                <Link href="/onboarding">
                  <Button variant="gold" size="hero">
                    Get started <ArrowRight size={18} />
                  </Button>
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/explore">
                  <Button variant="outline" size="hero">
                    Browse Interviewers
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
