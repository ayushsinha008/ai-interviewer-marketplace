"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import PricingSection from "./PricingSection";
import { AlertCircle } from "lucide-react";

export default function UpgradeModal({ open, onOpenChange, reason }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] min-w-[70vw] overflow-y-auto border-amber-200/10 pt-8">
        <DialogHeader>
          <div className="flex items-start gap-2 mb-2">
            <AlertCircle className="text-amber-400 ml-2 mt-1" />
            <div>
              <DialogTitle className="font-display text-2xl font-semibold">
                Upgrade your plan
              </DialogTitle>
              {reason && (
                <DialogDescription className="text-amber-400 mt-1">
                  {reason}
                </DialogDescription>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* PricingSection or any children slot in here */}
        <div className="overflow-visible px-2 pb-6 pt-2">
          <PricingSection />
        </div>
      </DialogContent>
    </Dialog>
  );
}
