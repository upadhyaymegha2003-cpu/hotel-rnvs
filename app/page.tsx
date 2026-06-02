"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Crown, Key, Shield, ArrowRight } from "lucide-react";

export default function HotelHub() {
  const [roomInput, setRoomInput] = useState("204");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEnterRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomInput.trim()) {
      router.push(`/room/${roomInput.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#222222] font-sans flex flex-col items-center justify-center p-4">
      {/* Container holding lobby card */}
      <div 
        id="hub-lobby-card" 
        className="w-full max-w-2xl bg-white rounded-3xl border border-[#EAE6DD] shadow-[0_24px_80px_rgba(201,168,76,0.06)] overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side: Welcoming Premium Graphics Vibe Card */}
        <div className="md:w-1/2 bg-[#1E293B] p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-30 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="w-10 h-10 rounded-xl bg-[#C9A84C] flex items-center justify-center text-white mb-6">
              <Crown className="w-5 h-5" />
            </div>
            
            <span className="text-[10px] tracking-widest text-[#BFAE74] uppercase font-bold">
              Luxury Redefined
            </span>
            <h1 className="text-2xl font-semibold tracking-tight mt-1 text-slate-100">
              Grand Stay Resort & Hotel Suite
            </h1>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Welcome to the digital guest service gateway. Order amenities, request towel refreshes, or contact the front concierge from any screen.
            </p>
          </div>

          <div className="relative z-10 mt-12 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              <p className="text-[10px] font-mono text-slate-400">
                Connected to Central Concierge Server
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Action Router Gate */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-lg font-bold text-[#1C1917] tracking-tight">
            Portal Selection
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Access either the guest in-room hub or staff workspace.
          </p>

          <div className="mt-6 flex flex-col gap-6">
            
            {/* Guest Entry Room Segment with custom form */}
            <form onSubmit={handleEnterRoom} className="space-y-2">
              <label className="text-[11px] font-bold text-[#8C763F] uppercase tracking-wider block">
                🏨 Guest Service Console
              </label>
              
              <div className="flex gap-2">
                <div className="relative flex-1 bg-slate-50 border border-[#EAE6DD] rounded-xl px-3 py-2 flex items-center gap-2 focus-within:border-[#C9A84C]">
                  <Key className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-400 font-mono">Room:</span>
                  {mounted ? (
                    <input
                      type="text"
                      value={roomInput}
                      onChange={(e) => setRoomInput(e.target.value)}
                      placeholder="204"
                      maxLength={5}
                      autoComplete="off"
                      spellCheck="false"
                      data-lpignore="true"
                      className="w-full bg-transparent border-0 outline-none focus:ring-0 text-xs font-bold text-slate-800 font-mono"
                    />
                  ) : (
                    <div className="w-full bg-transparent border-0 outline-none text-xs font-bold text-slate-800 font-mono h-6" aria-hidden>
                      {roomInput}
                    </div>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="bg-[#C9A84C] hover:bg-[#BFAE74] text-white px-4 rounded-xl flex items-center justify-center transition-all shadow-sm active:scale-95"
                  title="Launch guest room screen"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-gray-400">
                Enter your physical room ID (e.g. 204, 302, 105) to test multi-room updates dynamic synced flows.
              </p>
            </form>

            <div className="h-[1px] bg-[#EAE6DD]" />

            {/* Staff Entry block */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                💼 Operations Workspace
              </label>
              
              <Link
                href="/staff"
                id="btn-link-staff"
                className="w-full bg-slate-900 hover:bg-slate-800 text-slate-100 p-3.5 rounded-xl flex items-center justify-between transition-all shadow-sm font-semibold text-xs active:scale-[0.99]"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Access Staff Ops Dashboard</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              
              <p className="text-[10px] text-gray-400">
                Authorized resort desk attendants only. Coordinates real-time push tracking of guest tasks.
              </p>
            </div>

          </div>
        </div>

      </div>

      <div className="mt-8 text-center max-w-sm">
        <p className="text-[10px] text-gray-400">
          Grand Stay Digital Guest Service Platform. Designed using premium off-white, gold highlights and Inter/JetBrains fonts.
        </p>
      </div>
    </div>
  );
}
