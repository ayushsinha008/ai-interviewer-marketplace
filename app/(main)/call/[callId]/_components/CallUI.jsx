"use client";

import { useEffect, useCallback, useState } from "react";

// Stream Video
import {
  StreamTheme,
  SpeakerLayout,
  useCallStateHooks,
  useCall,
  CallingState,
  CallControls,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

// Stream Chat
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  Window,
  useCreateChatClient,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

import { Badge } from "@/components/ui/badge";
import { MessageSquare, Sparkles, Loader2 } from "lucide-react";
import AIQuestionsPanel from "./AIQuestions";

// ─── Call UI (inside StreamCall context) ─────────────────────────────────────

export default function CallUI({
  callId,
  isInterviewer,
  booking,
  onLeave,
  apiKey,
  token,
  currentUser,
}) {
  const { useCallCallingState } = useCallStateHooks();
  const call = useCall();
  const callingState = useCallCallingState();

  const [activeTab, setActiveTab] = useState("chat");

  // Auto-stop recording before leaving
  const handleLeave = useCallback(async () => {
    try {
      if (call) {
        const isRecording = call.state?.recording;
        if (isRecording) {
          await call.stopRecording().catch(() => {});
        }
        await call.leave().catch(() => {});
      }
    } finally {
      onLeave();
    }
  }, [call, onLeave]);

  // ── Chat client — same token works for both Video + Chat SDKs ──
  const chatClient = useCreateChatClient({
    apiKey,
    tokenOrProvider: token,
    userData: {
      id: currentUser.id,
      name: currentUser.name,
      image: currentUser.imageUrl,
    },
  });

  const [chatChannel, setChatChannel] = useState(null);

  useEffect(() => {
    if (!chatClient) return;

    const channel = chatClient.channel("messaging", callId, {
      name: "Interview Chat",
      members: [
        booking.interviewer.clerkUserId,
        booking.interviewee.clerkUserId,
      ],
    });

    channel
      .watch()
      .then(() => setChatChannel(channel))
      .catch(console.error);

    return () => {
      channel.stopWatching().catch(() => {});
    };
  }, [chatClient, callId, booking]);

  if (callingState === CallingState.LEFT) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#0a0a0b]">
        <Loader2 size={20} className="animate-spin text-amber-400" />
        <p className="text-sm text-stone-400">Leaving call…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[92vh] flex-col overflow-hidden bg-[#0a0a0b]">
      {/* Top bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/8 bg-black/40 px-6 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            LIVE
          </span>
          <Badge
            variant="outline"
            className="border-white/10 text-xs text-stone-400"
          >
            {booking.interviewer.name}
            <span className="mx-1.5 text-stone-700">×</span>
            {booking.interviewee.name}
          </Badge>
          {isInterviewer && (
            <Badge
              variant="outline"
              className="border-amber-400/25 bg-amber-400/10 text-xs text-amber-300"
            >
              Interviewer
            </Badge>
          )}
        </div>
      </div>

      {/* Body: video + side panel */}
      <div className="flex min-h-0 flex-1">
        {/* ── LEFT: Video ── */}
        <div className="flex min-w-0 flex-1 flex-col">
          <StreamTheme>
            <SpeakerLayout participantBarPosition="bottom" />
            <CallControls onLeave={handleLeave} />
          </StreamTheme>
        </div>

        {/* ── RIGHT: Chat / AI panel ── */}
        <div className="flex w-85 shrink-0 flex-col border-l border-white/8 bg-[#0a0a0b]/95 backdrop-blur-xl">
          {/* Tab switcher */}
          <div className="flex shrink-0 gap-1 border-b border-white/8 p-2">
            <button
              type="button"
              onClick={() => setActiveTab("chat")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-medium transition-all ${
                activeTab === "chat"
                  ? "bg-amber-400/10 text-amber-300 shadow-[inset_0_0_0_1px_rgba(251,191,36,0.2)]"
                  : "text-stone-500 hover:bg-white/5 hover:text-stone-300"
              }`}
            >
              <MessageSquare size={13} />
              Chat
            </button>

            {/* AI Questions tab — interviewer only */}
            {isInterviewer && (
              <button
                type="button"
                onClick={() => setActiveTab("ai")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-medium transition-all ${
                  activeTab === "ai"
                    ? "bg-amber-400/10 text-amber-300 shadow-[inset_0_0_0_1px_rgba(251,191,36,0.2)]"
                    : "text-stone-500 hover:bg-white/5 hover:text-stone-300"
                }`}
              >
                <Sparkles size={13} />
                AI Questions
              </button>
            )}
          </div>

          {/* Panel content */}
          <div className="flex-1 min-h-0 overflow-hidden">
            {activeTab === "chat" ? (
              chatClient && chatChannel ? (
                <Chat client={chatClient} theme="str-chat__theme-dark">
                  <Channel channel={chatChannel}>
                    <Window>
                      <MessageList />
                      <MessageInput focus />
                    </Window>
                  </Channel>
                </Chat>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Loader2 size={18} className="text-stone-600 animate-spin" />
                </div>
              )
            ) : (
              <div className="p-4 h-full overflow-y-scroll max-h-screen">
                <AIQuestionsPanel categories={booking.categories} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
