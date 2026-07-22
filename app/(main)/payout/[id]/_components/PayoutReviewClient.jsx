/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GrayTitle } from "@/components/reusables";
import { approvePayout } from "@/actions/payout";
import useFetch from "@/hooks/use-fetch";

export default function PayoutReviewClient({ payout }) {
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(payout.status === "PROCESSED");

  const { data, loading, error, fn: approveFn } = useFetch(approvePayout);

  useEffect(() => {
    if (data?.success) setDone(true);
  }, [data]);

  if (done) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-green-500/20 bg-[#0f0f11]/80 p-10 text-center backdrop-blur-sm shadow-[0_0_50px_-20px_rgba(34,197,94,0.5)]">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10 text-2xl">
          ✓
        </span>
        <p className="font-display text-xl font-semibold">
          <GrayTitle>Withdrawal approved</GrayTitle>
        </p>
        <p className="text-xs font-light text-stone-500">
          {payout.interviewerName} · ${payout.netAmount.toFixed(2)} via{" "}
          {payout.paymentMethod}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#0f0f11]/80 p-8 backdrop-blur-sm">
      {/* Payout summary */}
      <div className="rounded-xl bg-[#141417] border border-white/8 p-4 flex flex-col gap-2">
        <div className="flex justify-between text-xs">
          <span className="text-stone-500">Interviewer</span>
          <span className="text-stone-300">{payout.interviewerName}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-stone-500">Email</span>
          <span className="text-stone-300">{payout.interviewerEmail}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-stone-500">Credits</span>
          <span className="text-stone-300">{payout.credits}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-stone-500">Platform fee (20%)</span>
          <span className="text-red-400">
            − ${payout.platformFee.toFixed(2)}
          </span>
        </div>
        <Separator className="bg-white/8 my-1" />
        <div className="flex justify-between text-sm font-medium">
          <span className="text-stone-300">Pay out</span>
          <span className="font-display text-lg font-bold leading-none text-gradient-gold">
            ${payout.netAmount.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-xs pt-1">
          <span className="text-stone-500">Send to</span>
          <span className="text-stone-300">
            {payout.paymentMethod} · {payout.paymentDetail}
          </span>
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2">
        <Label className="text-stone-400 text-xs">Admin password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            password.trim() &&
            approveFn({ payoutId: payout.id, adminPassword: password })
          }
          placeholder="Enter password…"
          className="bg-[#141417] border-white/10 text-stone-100"
        />
      </div>

      {error && (
        <p className="text-xs text-red-400">{error?.message || error}</p>
      )}

      <Button
        variant="gold"
        disabled={!password.trim() || loading}
        onClick={() =>
          approveFn({ payoutId: payout.id, adminPassword: password })
        }
        className="w-full"
      >
        {loading ? "Approving…" : `Approve $${payout.netAmount.toFixed(2)} →`}
      </Button>
    </div>
  );
}
