"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { CATEGORIES } from "@/lib/data";
import InterviewerCard from "./InterviewerCard";
import { Reveal } from "@/components/premium";

export default function ExploreGrid({ interviewers }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return interviewers.filter((i) => {
      const matchesCategory =
        activeCategory === null || i.categories?.includes(activeCategory);

      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        i.name?.toLowerCase().includes(q) ||
        i.title?.toLowerCase().includes(q) ||
        i.company?.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [interviewers, activeCategory, search]);

  return (
    <div className="flex flex-col gap-8">
      {/* Filters bar */}
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="relative max-w-sm">
          <Search
            size={15}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500"
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, title or company…"
            className="border-white/10 bg-[#0f0f11]/80 pl-9 text-sm text-stone-100 backdrop-blur-sm placeholder:text-stone-600 focus-visible:border-amber-400/40 focus-visible:ring-amber-400/20"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat.value;
            return (
              <button
                key={String(cat.value)}
                type="button"
                onClick={() => setActiveCategory(cat.value)}
                className={`cursor-pointer rounded-lg border px-4 py-2 text-xs font-medium transition-all duration-200 ${
                  active
                    ? "border-amber-400/40 bg-amber-400/10 text-amber-300 shadow-[0_0_16px_-6px_rgba(16, 185, 129,0.45)]"
                    : "border-white/10 text-stone-500 hover:border-white/20 hover:text-stone-300"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Result count */}
      <p className="text-xs text-stone-600">
        {filtered.length === 0
          ? "No interviewers found"
          : `${filtered.length} interviewer${
              filtered.length === 1 ? "" : "s"
            } found`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-stone-600 text-sm">
            No interviewers match your filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory(null);
              setSearch("");
            }}
            className="text-xs text-amber-400 mt-2 hover:text-amber-300 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((interviewer, i) => (
            <Reveal key={interviewer.id} delay={Math.min(i * 0.05, 0.4)}>
              <InterviewerCard interviewer={interviewer} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
