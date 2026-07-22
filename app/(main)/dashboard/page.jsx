import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import PageHeader from "@/components/reusables";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getAvailability,
  getInterviewerAppointments,
  getInterviewerStats,
  getWithdrawalHistory,
} from "@/actions/dashboard";
import AvailabilitySection from "./components/AvailabilitySection";
import AppointmentsSection from "./components/AppointmentsSection";
import EarningsSection from "./components/EarningsSection";
import { ClipboardList, Clock, Wallet } from "lucide-react";
import { getCurrentUser } from "@/actions/user";

export default async function InterviewerDashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/");

  const dbUser = await getCurrentUser();

  const [availability, appointments, stats, withdrawalHistory] =
    await Promise.all([
      getAvailability(),
      getInterviewerAppointments(),
      getInterviewerStats(),

      // Assignment
      getWithdrawalHistory(),
    ]);

  return (
    <main className="min-h-screen bg-black">
      {/* Page header */}
      <PageHeader
        label="Interviewer dashboard"
        gray="Welcome back,"
        gold={dbUser.name?.split(" ")[0] ?? "Interviewer"}
        description={
          dbUser.title && dbUser.company
            ? `${dbUser.title} · ${dbUser.company}`
            : undefined
        }
        right={
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 px-6 py-4 text-right backdrop-blur-sm">
            <p className="text-xs uppercase tracking-wider text-stone-500">
              Credit balance
            </p>
            <p className="mt-1 font-display text-3xl font-bold leading-none text-gradient-gold">
              {stats?.creditBalance ?? 0}
            </p>
          </div>
        }
      />

      {/* Tabbed content */}
      <div className="max-w-6xl mx-auto px-8 py-10">
        <Tabs defaultValue="earnings">
          <TabsList className="mb-8 h-auto w-full border border-white/10 bg-[#0f0f11]/80 backdrop-blur-sm">
            <TabsTrigger
              value="earnings"
              className="p-5 data-[state=active]:border-amber-400/20 data-[state=active]:bg-amber-400/10 data-[state=active]:text-amber-300"
            >
              <Wallet size={16} className="text-amber-400" /> Earnings
            </TabsTrigger>
            <TabsTrigger
              value="appointments"
              className="p-5 data-[state=active]:border-amber-400/20 data-[state=active]:bg-amber-400/10 data-[state=active]:text-amber-300"
            >
              <ClipboardList size={18} className="text-amber-400" />{" "}
              Appointments
            </TabsTrigger>
            <TabsTrigger
              value="availability"
              className="p-5 data-[state=active]:border-amber-400/20 data-[state=active]:bg-amber-400/10 data-[state=active]:text-amber-300"
            >
              <Clock size={18} className="text-amber-400" /> Availability
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <AppointmentsSection appointments={appointments} />
          </TabsContent>

          <TabsContent value="availability">
            <AvailabilitySection initial={availability} />
          </TabsContent>

          <TabsContent value="earnings">
            <EarningsSection stats={stats} history={withdrawalHistory} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
