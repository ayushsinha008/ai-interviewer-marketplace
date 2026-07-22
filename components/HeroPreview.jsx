import Image from "next/image";
import { Sparkles, Mic, ChevronRight, Radio } from "lucide-react";

function VideoTile({ src, name, role, tag, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0f] ${className}`}
    >
      <Image
        src={src}
        alt={name}
        fill
        sizes="(max-width: 640px) 60vw, 320px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      {tag && (
        <span className="absolute right-2 top-2 rounded-md bg-black/50 px-2 py-0.5 text-[10px] font-medium text-stone-200 backdrop-blur-sm">
          {tag}
        </span>
      )}
      <div className="absolute inset-x-2 bottom-2 flex items-center justify-between">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-white">{name}</p>
          {role && <p className="truncate text-[10px] text-stone-300">{role}</p>}
        </div>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
          <Mic size={12} />
        </span>
      </div>
    </div>
  );
}

export default function HeroPreview() {
  return (
    <div className="glass-strong relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_40px_120px_-40px_rgba(16,185,129,0.5)]">
      {/* Window chrome */}
      <div className="flex h-11 items-center gap-2 border-b border-white/10 px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 hidden rounded-md border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-stone-500 sm:block">
          prept.app / live-interview
        </span>
        <div className="ml-auto flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-red-400">
            <Radio size={10} className="animate-pulse" /> Live
          </span>
          <span className="hidden font-display text-xs font-semibold text-stone-300 sm:block">
            12:48
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="grid gap-3 p-3 sm:grid-cols-5">
        {/* Video area */}
        <div className="relative sm:col-span-3">
          <VideoTile
            src="/avatars/hero-interviewer.jpg"
            name="Sarah Chen"
            role="Staff Engineer · Google"
            className="aspect-[4/3] h-full w-full"
          />
          {/* Self tile overlay */}
          <div className="absolute bottom-3 right-3 w-24 sm:w-28">
            <VideoTile
              src="/avatars/hero-you.jpg"
              name="You"
              tag="You"
              className="aspect-[4/3] shadow-lg"
            />
          </div>
        </div>

        {/* AI co-pilot panel */}
        <div className="flex flex-col gap-3 sm:col-span-2">
          <div className="flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.07] px-3.5 py-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300">
              <Sparkles size={14} />
            </span>
            <p className="font-display text-xs font-semibold text-stone-100">
              AI Co-pilot
            </p>
            <span className="ml-auto text-[10px] text-emerald-300/80">
              thinking…
            </span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#141417] p-3.5">
            <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-stone-500">
              Suggested question
            </p>
            <p className="text-xs leading-relaxed text-stone-200">
              &ldquo;How would you design a rate limiter for a distributed API
              gateway?&rdquo;
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-emerald-300">
              Ask this <ChevronRight size={12} />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#141417] p-3.5">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[10px] font-medium uppercase tracking-wider text-stone-500">
                Confidence
              </p>
              <p className="font-display text-xs font-bold text-gradient-gold">
                88%
              </p>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[88%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
            </div>
            <p className="mt-2.5 text-[10px] text-stone-500">
              Clear structure · steady pace · strong trade-off analysis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
