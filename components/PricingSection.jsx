"use client";

import { useAuth } from "@clerk/nextjs";
import { CheckoutButton } from "@clerk/nextjs/experimental";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/lib/data";
import { SpotlightCard } from "@/components/premium";

export default function PricingSection() {
  const { has, userId } = useAuth();

  const isSignedIn = !!userId;
  const isOnStarter = isSignedIn && has({ plan: "starter" });
  const isOnPro = isSignedIn && has({ plan: "pro" });
  const isOnFree = isSignedIn && !isOnStarter && !isOnPro;

  const activePlanSlug = isOnPro
    ? "pro"
    : isOnStarter
    ? "starter"
    : isOnFree
    ? "free"
    : null;

  return (
    <div className="grid grid-cols-1 gap-5 pt-4 md:grid-cols-3">
      {PLANS.map((plan) => {
        const isActive = activePlanSlug === plan.slug;

        return (
          <SpotlightCard
            key={plan.name}
            className={`lift relative flex h-full flex-col rounded-2xl p-10 backdrop-blur-sm transition-colors duration-300 ${
              plan.featured
                ? "gradient-border border border-amber-400/20 bg-[#141417]/90 shadow-[0_0_60px_-24px_rgba(16, 185, 129,0.55)]"
                : "border border-white/10 bg-[#0f0f11]/80 hover:border-amber-400/15"
            } ${isActive ? "ring-1 ring-amber-400/30" : ""}`}
          >
            {/* Most Popular badge */}
            {plan.featured && !isActive && (
              <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-[0_6px_20px_-6px_rgba(16, 185, 129,0.7)]">
                Most Popular
              </span>
            )}

            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-stone-500">
              {plan.name}
            </p>

            <div className="mb-1.5 flex items-end gap-1">
              <span
                className={`font-display text-5xl font-bold leading-none tracking-tight ${
                  plan.featured
                    ? "text-gradient-gold"
                    : "bg-gradient-to-br from-stone-100 to-stone-400 bg-clip-text text-transparent"
                }`}
              >
                {plan.price}
              </span>
              <span className="text-sm text-stone-500 font-light mb-1.5">
                /month
              </span>
            </div>

            <p className="text-sm text-amber-400 mb-7">{plan.credits}</p>

            <div className="h-px bg-white/10 mb-7" />

            <ul className="space-y-3 mb-9 flex-1">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm text-stone-400"
                >
                  <span className="text-amber-400 text-xs mt-0.5">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            {isActive ? (
              // Already on this plan
              <Button
                variant={plan.featured ? "gold" : "default"}
                disabled
                className="w-full opacity-50 cursor-not-allowed"
              >
                ✓ Current plan
              </Button>
            ) : plan.planId === null ? (
              // Free plan — no checkout needed
              isSignedIn ? (
                <Button
                  variant="outline"
                  disabled
                  className="w-full opacity-50 cursor-not-allowed"
                >
                  Default plan
                </Button>
              ) : (
                <SignInButton mode="modal">
                  <Button variant="outline" className="w-full">
                    Get started free
                  </Button>
                </SignInButton>
              )
            ) : isSignedIn ? (
              <CheckoutButton
                planId={plan.planId}
                planPeriod="month"
                checkoutProps={{
                  appearance: {
                    elements: {
                      drawerRoot: {
                        zIndex: 2000,
                      },
                    },
                  },
                }}
              >
                <Button
                  variant={plan.featured ? "gold" : "outline"}
                  className="w-full"
                >
                  {activePlanSlug === "pro" && plan.slug === "starter"
                    ? "Downgrade"
                    : activePlanSlug === "starter" && plan.slug === "pro"
                    ? "Upgrade →"
                    : "Get started →"}
                </Button>
              </CheckoutButton>
            ) : (
              // Paid plan, signed out → sign in first
              <SignInButton mode="modal">
                <Button
                  variant={plan.featured ? "gold" : "outline"}
                  className="w-full"
                >
                  Get started →
                </Button>
              </SignInButton>
            )}
          </SpotlightCard>
        );
      })}
    </div>
  );
}
