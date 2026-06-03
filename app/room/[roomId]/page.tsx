"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import {
  PenTool,
  Clock,
  CheckCircle2,
  ArrowLeft,
  Crown,
  Send,
  Loader2,
  Undo2,
  UserRound
} from "lucide-react";
import { RequestItem, GuestRequest, RequestStatus } from "@/src/types";

interface CheckedInGuest {
  roomId: string;
  guestName: string;
  reservationCode: string;
  checkoutDate: string;
}

// Standard request items as requested
const STANDARD_ITEMS: RequestItem[] = [
  { id: "towels", emoji: "🛁", label: "Fresh Towels", description: "Soft & fluffy, right away" },
  { id: "toiletries", emoji: "🪥", label: "Toiletries Kit", description: "Toothbrush, paste & more" },
  { id: "pillow", emoji: "🛏", label: "Extra Pillow", description: "For a better night's rest" },
  { id: "soap", emoji: "🧴", label: "Shampoo/Soap", description: "Top up your bathroom" },
  { id: "blanket", emoji: "❄️", label: "Extra Blanket", description: "Stay warm tonight" },
  { id: "custom", emoji: "✍️", label: "Custom Request", description: "Something else in mind?" },
];

export default function GuestScreen() {
  const params = useParams();
  const searchParams = useSearchParams();
  const roomId = (params?.roomId as string) || "204";
  const roomToken = searchParams.get("token");

  // State managers
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [customText, setCustomText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<GuestRequest | null>(null);
  const [checkedInGuest, setCheckedInGuest] = useState<CheckedInGuest | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    fetch(`/api/rooms/${encodeURIComponent(roomId)}`)
      .then((response) => response.json())
      .then(setCheckedInGuest)
      .catch(() =>
        setCheckedInGuest({
          roomId,
          guestName: "Checked-in Guest",
          reservationCode: `GS-${roomId}`,
          checkoutDate: "2026-06-07",
        })
      );
  }, [roomId]);

  // Connection for SSE live-sync updates
  useEffect(() => {
    if (!submittedRequest) return;

    const eventSource = new EventSource(
      `/api/requests/stream?roomId=${encodeURIComponent(roomId)}${roomToken ? `&token=${encodeURIComponent(roomToken)}` : ""}`
    );

    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.type === "UPDATE" && payload.data.id === submittedRequest.id) {
          setSubmittedRequest(payload.data);
        }
      } catch (err) {
        console.error("Error parsing SSE on guest screen", err);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [roomId, roomToken, submittedRequest?.id]);

  const handleCardClick = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const isCustomSelected = selectedIds.includes("custom");

  const handleSubmit = async () => {
    if (selectedIds.length === 0) return;

    setIsSubmitting(true);

    // Get selected standard item models
    const chosenItems = STANDARD_ITEMS.filter((item) =>
      selectedIds.includes(item.id) && item.id !== "custom"
    );

    // If custom request card is selected, represent it
    if (isCustomSelected) {
      chosenItems.push({
        id: "custom-entry",
        emoji: "✍️",
        label: "Custom Request",
        description: customText || "Special accommodation requested"
      });
    }

    try {
      // API call to Next.js route handler
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId,
          items: chosenItems,
          customText: isCustomSelected ? customText : undefined,
          roomToken,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create request");
      }

      const newReq = await response.json();
      
      // Artificial delay to let guest enjoy premium spinner state
      setTimeout(() => {
        setSubmittedRequest(newReq);
        setIsSubmitting(false);
      }, 900);

    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  // Timeline steps for the elegant stepper
  const STEPS: { status: RequestStatus; title: string; desc: string }[] = [
    { status: "PENDING", title: "Received", desc: "Sent to Concierge Desk" },
    { status: "ACKNOWLEDGED", title: "Acknowledged", desc: "Staff are reviewing requests" },
    { status: "IN_PROGRESS", title: "On the Way", desc: "Request is dispatched items" },
    { status: "DONE", title: "Delivered", desc: "Placed at your doorway" },
  ];

  const getStepIndex = (status: RequestStatus) => {
    return STEPS.findIndex((s) => s.status === status);
  };

  const currentStepIdx = submittedRequest ? getStepIndex(submittedRequest.status) : 0;

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#222222] font-sans antialiased flex flex-col items-center py-0 sm:py-8 px-0 sm:px-4">
      {/* Container simulating a premium personal device app / clean card */}
      <div 
        id="guest-main-card" 
        className="w-full max-w-md bg-white sm:rounded-3xl sm:shadow-[0_24px_60px_rgba(201,168,76,0.08)] border-0 sm:border border-[#EAE6DD] min-h-screen sm:min-h-[812px] flex flex-col overflow-hidden relative"
      >
        {/* Decorative Top Accent line */}
        <div className="h-1 bg-[#C9A84C] w-full" />

        {/* Back Link to directory (only visible in prototype for easy navigation) */}
        <div className="px-4 pt-3 flex justify-between items-center bg-[#FDFDFB] border-b border-[#F4EFE6]">
          <Link 
            href="/" 
            className="flex items-center gap-1.5 text-xs font-semibold text-[#8C763F] hover:text-[#C9A84C] transition-colors py-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Hotel Hub
          </Link>
          <Link 
            href="/staff" 
            className="text-xs px-2.5 py-1 bg-[#1E293B] text-[#F1F5F9] rounded-full hover:bg-slate-800 transition-colors"
          >
            Staff DB ↗
          </Link>
        </div>

        {/* Header Section */}
        <div className="p-6 pb-4 bg-[#FDFDFB]">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div 
                id="hotel-logo" 
                className="w-8 h-8 rounded-lg bg-[#C9A84C] flex items-center justify-center text-white"
              >
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-widest text-[#8C763F] uppercase">
                  Grand Stay
                </h1>
                <p className="text-[10px] text-gray-400 tracking-wider">HOTEL & RESORT</p>
              </div>
            </div>
            
            <div className="bg-[#FAF8F5] border border-[#EAE6DD] text-[#8C763F] font-semibold text-xs py-1 px-3 rounded-full shadow-inner flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              Room {roomId}
            </div>
          </div>

          <div className="mt-4 bg-white border border-[#EAE6DD] rounded-xl p-3 flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-[#1E293B] text-white flex items-center justify-center shrink-0">
              <UserRound className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                Checked-in guest
              </p>
              <p className="text-sm font-bold text-[#1C1917] truncate">
                {checkedInGuest?.guestName || "Loading guest..."}
              </p>
              <p className="text-[10px] text-gray-400 font-mono">
                Room {roomId}
                {checkedInGuest?.reservationCode ? ` · ${checkedInGuest.reservationCode}` : ""}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <h2 className="text-2xl font-semibold tracking-tight text-[#1C1917]">
              How can we help you tonight?
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Select items below and our team will courier them directly.
            </p>
          </div>
        </div>

        {/* Primary Screen Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6">
          {!submittedRequest ? (
            <>
              {/* Request Type Grid */}
              <div className="grid grid-cols-2 gap-3.5">
                {STANDARD_ITEMS.map((item) => {
                  const isSelected = selectedIds.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      id={`card-${item.id}`}
                      onClick={() => handleCardClick(item.id)}
                      className={`relative overflow-hidden text-left p-4 rounded-xl border min-h-[92px] transition-all duration-300 transform active:scale-[0.97] flex flex-col justify-between ${
                        isSelected
                          ? "border-[#C9A84C] bg-[#FCFBF7] shadow-[0_4px_16px_rgba(201,168,76,0.1)]"
                          : "border-[#EAE6DD] bg-white hover:border-[#DED9CE]"
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="text-2xl">{item.emoji}</span>
                        {isSelected && (
                          <div className="w-4 h-4 bg-[#C9A84C] rounded-full flex items-center justify-center text-white">
                            <span className="block text-[9px] font-bold">✓</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-2.5">
                        <h3 className="font-semibold text-xs text-[#1C1917]">
                          {item.label}
                        </h3>
                        <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Character-limited conditional Custom Entry Area */}
              {isCustomSelected && (
                <div className="animate-in fade-in slide-in-from-top duration-300">
                  <label className="block text-xs font-semibold text-[#8C763F] mb-1.5 flex items-center gap-1">
                    <PenTool className="w-3.5 h-3.5" />
                    Specify Details
                  </label>
                  <div className="bg-white border border-[#EAE6DD] rounded-xl p-3 focus-within:border-[#C9A84C] transition-colors shadow-inner">
                    {mounted ? (
                      <textarea
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value.slice(0, 200))}
                        placeholder="E.g. ice bucket, extra hangers, wake-up call at 7am..."
                        className="w-full h-20 text-xs bg-transparent border-0 outline-none resize-none focus:ring-0 text-[#222222]"
                        autoComplete="off"
                        spellCheck="false"
                        data-lpignore="true"
                      />
                    ) : (
                      <div className="w-full h-20 text-xs bg-transparent border-0 outline-none resize-none focus:ring-0 text-[#222222]" aria-hidden>
                        {customText || "E.g. ice bucket, extra hangers, wake-up call at 7am..."}
                      </div>
                    )}
                    <div className="flex justify-end pt-1 bg-white border-t border-gray-50">
                      <span className="text-[9px] text-gray-400 font-mono">
                        {customText.length}/200
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Submit Control */}
              <div className="mt-auto pt-4">
                <button
                  id="btn-submit"
                  disabled={selectedIds.length === 0 || isSubmitting}
                  onClick={handleSubmit}
                  className={`w-full py-4 px-4 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                    selectedIds.length === 0
                      ? "bg-[#F1EFEA] text-[#B0AA9F] cursor-not-allowed"
                      : isSubmitting
                      ? "bg-[#C9A84C] text-white opacity-80"
                      : "bg-[#C9A84C] text-white hover:bg-[#BFAE74] shadow-md shadow-amber-700/10 active:scale-[0.98]"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Dispatching to ConciergeDesk...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Submit Hotel Request
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            // Status tracker (post-submit mode)
            <div className="flex flex-col gap-5 py-2 animate-in fade-in duration-500">
              {/* Success Banner Card */}
              <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-2xl p-5 flex items-start gap-3.5 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center text-white shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#047857]">✓ Request Sent</h3>
                  <p className="text-xs text-[#065F46] mt-0.5">
                    Your request has been beamed directly to our room operations team.
                  </p>
                </div>
              </div>

              {/* Active Status Tracker Panel */}
              <div className="bg-white border border-[#EAE6DD] rounded-2xl p-5 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-50">
                  <div>
                    <p className="text-[10px] uppercase font-mono tracking-wider text-gray-400">
                      Tracking Request
                    </p>
                    <p className="text-xs font-bold text-[#1C1917] mt-0.5">
                      Room {roomId} Request Portal
                    </p>
                  </div>
                  {/* Estimated Time Chip */}
                  <div className="bg-[#FAF8F5] border border-[#EAE6DD] text-[#8C763F] font-mono text-[10px] font-semibold py-1 px-2.5 rounded-full flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C9A84C]" />
                    Usually 10–15 min
                  </div>
                </div>

                {/* Submitted items digest list */}
                <div className="bg-[#FAF9F6] p-3 rounded-lg border border-[#F2EDE2]">
                  <p className="text-[9px] uppercase font-bold text-gray-400 mb-1.5 tracking-wider">
                    Requested Items
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {submittedRequest.items.map((item, idx) => (
                      <span 
                        key={idx} 
                        className="bg-white border border-[#EAE6DD] text-xs px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1.5"
                      >
                        <span>{item.emoji}</span>
                        <span className="text-gray-700">{item.label}</span>
                      </span>
                    ))}
                  </div>
                  {submittedRequest.customText && (
                    <div className="mt-2 text-[11px] text-gray-500 italic bg-white p-2 rounded border border-gray-100">
                      &ldquo;{submittedRequest.customText}&rdquo;
                    </div>
                  )}
                </div>

                {/* Stepper Timeline UI */}
                <div className="flex flex-col gap-4 mt-2">
                  {STEPS.map((step, index) => {
                    const isCompleted = index < currentStepIdx;
                    const isActive = index === currentStepIdx;
                    const isUpcoming = index > currentStepIdx;

                    return (
                      <div key={index} className="flex gap-4 items-start relative select-none">
                        {/* Connecting Line */}
                        {index < STEPS.length - 1 && (
                          <div 
                            className={`absolute left-2.5 top-6 bottom-0 w-0.5 -ml-[1px] ${
                              index < currentStepIdx ? "bg-[#C9A84C]" : "bg-[#F3EFE6]"
                            }`}
                          />
                        )}

                        {/* Dot indicator */}
                        <div className="relative mt-1 z-10">
                          {isCompleted ? (
                            <div className="w-5 h-5 rounded-full bg-[#C9A84C] flex items-center justify-center text-white shadow-sm duration-300">
                              <span className="text-[10px] font-bold">✓</span>
                            </div>
                          ) : isActive ? (
                            <div className="w-5 h-5 rounded-full bg-white border-2 border-[#C9A84C] flex items-center justify-center relative shadow-sm">
                              <span className="w-2 h-2 rounded-full bg-[#C9A84C] animate-ping absolute" />
                              <span className="w-2 h-2 rounded-full bg-[#C9A84C] relative z-10" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-white border border-[#EAE6DD] flex items-center justify-center" />
                          )}
                        </div>

                        {/* Text labels */}
                        <div>
                          <p 
                            className={`text-xs font-bold leading-tight ${
                              isActive 
                                ? "text-[#1C1917]" 
                                : isCompleted 
                                ? "text-[#8C763F]" 
                                : "text-gray-400"
                            }`}
                          >
                            {step.title}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Restart flow for simulation comfort */}
              <button
                onClick={() => {
                  setSelectedIds([]);
                  setCustomText("");
                  setSubmittedRequest(null);
                }}
                className="mx-auto flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#C9A84C] transition-colors py-2"
              >
                <Undo2 className="w-3.5 h-3.5" />
                Submit another request
              </button>
            </div>
          )}
        </div>

        {/* Footer info brand */}
        <div className="mt-auto py-5 px-6 border-t border-[#F4EFE6] bg-[#FCFBF8] text-center">
          <p className="text-[10px] text-gray-400 tracking-wide font-sans">
            Grand Stay Concierge Portals &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
