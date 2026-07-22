"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GoldTitle, GrayTitle, SectionLabel } from "@/components/reusables";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { completeOnboarding } from "@/actions/onboarding";
import useFetch from "@/hooks/use-fetch";
import { CATEGORIES, ONBOARDING_ROLES, YEARS_OPTIONS } from "@/lib/data";
import { Reveal, SpotlightCard } from "@/components/premium";
import { StarsBackgroundDemo } from "@/components/demo-components-backgrounds-stars";

export default function OnboardingPage() {
  const router = useRouter();

  const { data, loading, fn: onboardingFn } = useFetch(completeOnboarding);

  const [role, setRole] = useState(null);
  const [form, setForm] = useState({
    title: "",
    company: "",
    yearsExp: "",
    bio: "",
    categories: [],
  });

  useEffect(() => {
    if (data && !loading) {
      router.push(role === "INTERVIEWER" ? "/dashboard" : "/explore");
    }
  }, [data, router]);

  const toggleCategory = (val) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(val)
        ? prev.categories.filter((c) => c !== val)
        : [...prev.categories, val],
    }));
  };

  const isInterviewerValid =
    form.title.trim() &&
    form.company.trim() &&
    form.yearsExp &&
    form.bio.trim() &&
    form.categories.length > 0;

  const canSubmit =
    role === "INTERVIEWEE" || (role === "INTERVIEWER" && isInterviewerValid);

  const handleSubmit = () => {
    if (!canSubmit) return;

    onboardingFn({
      role,
      ...(role === "INTERVIEWER" && {
        title: form.title,
        company: form.company,
        yearsExp: Number(form.yearsExp),
        bio: form.bio,
        categories: form.categories,
      }),
    });
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden bg-black px-6 py-24">
      <StarsBackgroundDemo />
      <div className="aurora opacity-60" aria-hidden />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Heading */}
        <Reveal className="mb-10 text-center">
          <SectionLabel>Welcome</SectionLabel>
          <h1 className="mt-1 font-display text-4xl font-semibold leading-tight tracking-tighter sm:text-5xl">
            <GrayTitle>How will you be</GrayTitle>
            <br />
            <GoldTitle>using Prept?</GoldTitle>
          </h1>
          <p className="mt-4 text-sm font-light leading-relaxed text-stone-500">
            This helps us personalise your experience.
            <span className="text-stone-600">
              {" "}
              You can&apos;t change this later.
            </span>
          </p>
        </Reveal>

        {!role && (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            {ONBOARDING_ROLES.map((r, i) => (
              <Reveal key={r.value} delay={i * 0.08}>
                <SpotlightCard
                  as="button"
                  type="button"
                  onClick={() => setRole(r.value)}
                  className="lift h-full w-full rounded-2xl border border-white/10 bg-[#0f0f11]/80 p-8 text-left backdrop-blur-sm transition-colors duration-300 hover:border-amber-400/25"
                >
                  <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/10 text-xl">
                    {r.icon}
                  </span>
                  <h3 className="mb-3 font-display text-xl font-semibold tracking-tight text-stone-100">
                    {r.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-stone-400">
                    {r.desc}
                  </p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        )}

        {role && (
          <div className="flex flex-col gap-6">
            {/* role strip */}
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0f0f11]/80 px-6 py-4 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-base shrink-0">
                  {ONBOARDING_ROLES.find((r) => r.value === role)?.icon}
                </span>
                <div>
                  <p className="text-sm font-medium text-stone-200">
                    {ONBOARDING_ROLES.find((r) => r.value === role)?.title}
                  </p>
                  <p className="text-xs text-stone-600 mt-0.5">Selected role</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setRole(null)}>
                Change
              </Button>
            </div>

            {/* interviewer form */}
            {role === "INTERVIEWER" && (
              <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-[#0f0f11]/80 p-8 backdrop-blur-sm">
                {/* Title + Company */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="title">Current title</Label>
                    <Input
                      id="title"
                      placeholder="Senior Software Engineer"
                      value={form.title}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, title: e.target.value }))
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      placeholder="Google, Meta, Startup…"
                      value={form.company}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, company: e.target.value }))
                      }
                    />
                  </div>
                </div>

                {/* years */}
                <div className="flex flex-wrap gap-2">
                  {YEARS_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        setForm((p) => ({ ...p, yearsExp: opt.value }))
                      }
                      className={`text-xs px-4 py-2 rounded-lg border ${
                        form.yearsExp === opt.value
                          ? "border-amber-400/40 bg-amber-400/10 text-amber-400"
                          : "border-white/10 text-stone-500"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {/* categories */}
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => {
                    if (!cat?.value) return null;

                    const active = form.categories.includes(cat.value);

                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => toggleCategory(cat.value)}
                        className={`text-xs px-4 py-2 rounded-lg border ${
                          active
                            ? "border-amber-400/40 bg-amber-400/10 text-amber-400"
                            : "border-white/10 text-stone-500"
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                {/* bio */}
                <Textarea
                  rows={4}
                  maxLength={300}
                  placeholder="Tell interviewees about your background, what you specialise in, and what they can expect from a session with you."
                  value={form.bio}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, bio: e.target.value }))
                  }
                />
              </div>
            )}

            <Button
              variant="gold"
              size="hero"
              className="w-full"
              disabled={!canSubmit || loading}
              onClick={handleSubmit}
            >
              {loading
                ? "Setting up your account…"
                : role === "INTERVIEWER"
                ? "Create interviewer profile →"
                : "Go to dashboard →"}
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
