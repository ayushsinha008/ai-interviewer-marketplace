import { StarsBackgroundDemo } from "@/components/demo-components-backgrounds-stars";
import { GoldTitle, GrayTitle } from "@/components/reusables";

const AuthLayout = ({ children }) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-28">
      <StarsBackgroundDemo />
      <div className="aurora" aria-hidden />

      <div className="relative z-10 flex w-full flex-col items-center">
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            <GrayTitle>Welcome to </GrayTitle>
            <GoldTitle>Prept</GoldTitle>
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            AI-powered mock interviews with real experts.
          </p>
        </div>

        <div className="flex justify-center">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
