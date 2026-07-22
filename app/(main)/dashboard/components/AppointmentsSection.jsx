"use client";

import { AppointmentCard } from "@/components/AppointmentCard";
import { GrayTitle } from "@/components/reusables";
import { ClipboardList } from "lucide-react";

export default function AppointmentsSection({ appointments }) {
  const now = new Date();
  const scheduled = appointments.filter(
    (a) => a.status === "SCHEDULED" && new Date(a.startTime) > now
  );
  const past = appointments.filter(
    (a) => a.status !== "SCHEDULED" || new Date(a.endTime) <= now
  );

  return (
    <section className="flex flex-col gap-6">
      <div className="rounded-2xl border border-white/10 bg-[#0f0f11]/80 p-8 backdrop-blur-sm">
        <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/10">
          <ClipboardList size={18} className="text-amber-400" />
        </span>
        <h2 className="font-display text-xl font-semibold tracking-tight">
          <GrayTitle>Appointments</GrayTitle>
        </h2>
        <p className="mt-1 text-xs font-light text-stone-500">
          All your scheduled and past sessions.
        </p>
      </div>

      {appointments.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#0f0f11]/80 py-20 text-center backdrop-blur-sm">
          <p className="text-sm text-stone-600">No appointments yet.</p>
          <p className="mt-1 text-xs text-stone-700">
            Once interviewees book your slots, they&apos;ll appear here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {scheduled.length > 0 && (
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                Upcoming ({scheduled.length})
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {scheduled.map((b) => (
                  <AppointmentCard key={b.id} booking={b} mode="interviewer" />
                ))}
              </div>
            </div>
          )}

          {past.length > 0 && (
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold text-stone-500 tracking-widest uppercase">
                Past ({past.length})
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {past.map((b) => (
                  <AppointmentCard
                    key={b.id}
                    booking={b}
                    mode="interviewer"
                    isPast
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
