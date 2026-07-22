import { checkUser } from "@/lib/checkUser";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import RoleRedirect from "./RoleRedirect";
import CreditButton from "./CreditButton";
import { CalendarDays, Users, MessagesSquare } from "lucide-react";

const Header = async () => {
  const user = await checkUser();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/8 bg-black/60 px-3 py-3 backdrop-blur-xl supports-[backdrop-filter]:bg-black/50 sm:px-10">
      <Link href="/" className="group flex items-center gap-2.5">
        <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-[#052018] shadow-[0_6px_20px_-6px_rgba(16,185,129,0.7)] transition-transform duration-300 group-hover:scale-105">
          <MessagesSquare size={18} strokeWidth={2.4} />
        </span>
        <span className="font-display text-xl font-bold tracking-tight text-stone-100">
          Prept
        </span>
      </Link>

      {user && <RoleRedirect role={user.role} />}

      <div className="flex items-center gap-2 sm:gap-3">
        <SignedOut>
          <SignInButton mode="modal">
            <Button variant="ghost">Sign in</Button>
          </SignInButton>
          <SignInButton mode="modal">
            <Button variant="gold">Get started →</Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          {user?.role === "INTERVIEWER" && (
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          )}

          {user?.role === "INTERVIEWEE" && (
            <>
              <Button variant="ghost" asChild>
                <Link href="/explore">
                  <Users size={16} />
                  <span className="hidden md:inline">Explore</span>
                </Link>
              </Button>
              <Button variant="default" asChild>
                <Link href="/appointments">
                  <CalendarDays size={16} />
                  <span className="hidden md:inline">My Appointments</span>
                </Link>
              </Button>
            </>
          )}

          <CreditButton
            role={user?.role === "INTERVIEWER" ? "INTERVIEWER" : "INTERVIEWEE"}
            credits={
              (user?.role === "INTERVIEWER"
                ? user?.creditBalance
                : user?.credits) ?? 0
            }
          />

          <div className="ml-0.5 flex items-center rounded-full ring-1 ring-white/10">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9",
                },
              }}
            />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Header;
