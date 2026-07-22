// Assignment

import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PayoutReviewClient from "./_components/PayoutReviewClient";
import { GoldTitle, GrayTitle, SectionLabel } from "@/components/reusables";
import { StarsBackgroundDemo } from "@/components/demo-components-backgrounds-stars";

export default async function PayoutReviewPage({ params }) {
  const { id } = await params;

  const payout = await db.payout.findUnique({
    where: { id },
    include: {
      interviewer: { select: { name: true, email: true } },
    },
  });

  if (!payout) notFound();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0b] px-6 text-stone-100 antialiased">
      <StarsBackgroundDemo />
      <div className="aurora opacity-60" aria-hidden />

      <div className="relative z-10 flex w-full max-w-sm flex-col gap-6">
        <div className="text-center">
          <SectionLabel>Admin</SectionLabel>
          <h1 className="mt-1 font-display text-4xl font-semibold tracking-tighter">
            <GrayTitle>Review </GrayTitle>
            <GoldTitle>Withdrawal</GoldTitle>
          </h1>
        </div>

        <PayoutReviewClient
          payout={{
            id: payout.id,
            credits: payout.credits,
            netAmount: payout.netAmount,
            platformFee: payout.platformFee,
            paymentMethod: payout.paymentMethod,
            paymentDetail: payout.paymentDetail,
            status: payout.status,
            interviewerName: payout.interviewer.name,
            interviewerEmail: payout.interviewer.email,
          }}
        />
      </div>
    </main>
  );
}
