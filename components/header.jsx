import { checkUser } from "@/lib/checkUser";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import RoleRedirect from "./RoleRedirect";
import CreditButton from "./CreditButton";
import { CalendarDays, Users } from "lucide-react";

const Header = async () => {
  const user = await checkUser();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/8 bg-black/60 px-3 py-3 backdrop-blur-xl supports-[backdrop-filter]:bg-black/50 sm:px-10">
      <Link href="/" className="group flex items-center transition-opacity">
        <Image
          src="/logo.png"
          alt="Prept Logo"
          width={100}
          height={100}
          className="h-11 w-auto transition-transform duration-300 group-hover:scale-105"
        />
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
