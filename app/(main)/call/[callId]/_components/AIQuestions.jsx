"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { CATEGORY_LABEL } from "@/lib/data";
import { generateInterviewQuestions } from "@/actions/aiQuestions";
import useFetch from "@/hooks/use-fetch";

export default function AIQuestionsPanel({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(
    categories?.[0] ?? null
  );

  const {
    data,
    loading,
    error,
    fn: generateFn,
  } = useFetch(generateInterviewQuestions);

  const questions = data?.questions ?? [];

  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-400/20 bg-amber-400/10">
          <Sparkles size={14} className="text-amber-400" />
        </span>
        <div>
          <p className="font-display text-sm font-semibold text-stone-100">
            AI Co-pilot
          </p>
          <p className="text-[10px] uppercase tracking-widest text-stone-600">
            Live question generator
          </p>
        </div>
      </div>

      {/* Category selector */}
      <div className="flex flex-wrap gap-1.5">
        {categories?.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
              selectedCategory === cat
                ? "border-amber-400/40 bg-amber-400/10 text-amber-400"
                : "border-white/10 text-stone-500 hover:border-white/20 hover:text-stone-400"
            }`}
          >
            {CATEGORY_LABEL[cat] ?? cat}
          </button>
        ))}
      </div>

      <Button
        variant="gold"
        size="sm"
        disabled={loading || !selectedCategory}
        onClick={() => generateFn({ category: selectedCategory })}
        className="self-start gap-2"
      >
        {loading ? (
          <>
            <Loader2 size={13} className="animate-spin" />
            Generating…
          </>
        ) : (
          <>
            <Sparkles size={13} />
            Generate questions
          </>
        )}
      </Button>

      {error && (
        <p className="text-xs text-red-400">{error?.message || error}</p>
      )}

      {/* Questions list */}
      {questions.length > 0 ? (
        <div className="flex flex-col gap-3 overflow-y-auto flex-1 pr-1">
          {questions.map((q, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 rounded-xl border border-white/8 bg-[#141417] p-4 transition-colors duration-200 hover:border-amber-400/20"
            >
              <p className="text-sm font-medium leading-snug text-stone-200">
                <span className="mr-1 text-amber-400/70">{i + 1}.</span>
                {q.question}
              </p>
              <div className="h-px bg-white/5" />
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                <span className="text-amber-400/70 font-medium">Answer: </span>
                {q.answer}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center">
          <span className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
            <Sparkles size={16} className="text-amber-400" />
          </span>
          <p className="text-xs text-stone-600">
            Select a category and generate role-specific questions for this
            session.
          </p>
        </div>
      )}
    </div>
  );
}
