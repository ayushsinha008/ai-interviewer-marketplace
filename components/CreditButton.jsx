"use client";

import { useState } from "react";
import { Coins } from "lucide-react";
import UpgradeModal from "./UpgradeModal";
import { Button } from "./ui/button";

export default function CreditButton({ role, credits }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (role === "INTERVIEWER") {
      window.location.href = "/dashboard";
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="cursor-pointer border-amber-400/25 bg-amber-400/5 text-amber-300 hover:border-amber-400/40 hover:bg-amber-400/10"
        onClick={handleClick}
      >
        <Coins size={14} />
        <span className="font-medium">
          {credits}{" "}
          <span className="opacity-70">
            {role === "INTERVIEWER" ? "Earned" : "Credits"}
          </span>
        </span>
      </Button>

      <UpgradeModal open={open} onOpenChange={setOpen} />
    </>
  );
}
