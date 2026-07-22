import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Header from "@/components/header";
import { Inter, Manrope, Lora } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import { CursorSpotlight, ScrollProgress } from "@/components/premium";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata = {
  title: "Prept — AI-powered mock interviews with real experts",
  description:
    "Book 1:1 mock interviews with senior engineers from top companies. Get AI-powered feedback, role-specific questions, and the confidence to land your dream job.",
  authors: [{ name: "Ayush" }],
  creator: "Ayush",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        theme: dark,
        variables: {
          colorPrimary: "#fbbf24",
          colorBackground: "#0a0a0b",
          colorText: "#f5f5f4",
          colorInputBackground: "#141417",
          borderRadius: "0.9rem",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={`${inter.variable} ${manrope.variable} ${lora.variable} font-sans bg-black text-stone-200 antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ScrollProgress />
            <CursorSpotlight />
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors theme="dark" position="top-center" />

            <footer className="relative z-10 border-t border-white/8 bg-black">
              <div className="mx-auto max-w-6xl px-6 py-14">
                <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
                  <div>
                    <p className="font-display text-lg font-semibold tracking-tight text-stone-100">
                      Prept
                    </p>
                    <p className="mt-1 text-sm text-stone-500">
                      AI-powered mock interviews with real experts.
                    </p>
                  </div>

                  <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm text-stone-400">
                    <Link
                      href="/explore"
                      className="transition-colors hover:text-amber-300"
                    >
                      Explore
                    </Link>
                    <Link
                      href="/onboarding"
                      className="transition-colors hover:text-amber-300"
                    >
                      Get started
                    </Link>
                    <Link
                      href="/dashboard"
                      className="transition-colors hover:text-amber-300"
                    >
                      Dashboard
                    </Link>
                  </nav>
                </div>

                <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-stone-600 sm:flex-row">
                  <p>© {new Date().getFullYear()} Prept. All rights reserved.</p>
                  <p>
                    Made with <span className="text-amber-400">❤</span> by Ayush
                  </p>
                </div>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
