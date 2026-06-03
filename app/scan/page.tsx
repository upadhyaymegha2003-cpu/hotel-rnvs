"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, Key, Loader2, QrCode, ScanLine } from "lucide-react";

declare global {
  interface Window {
    BarcodeDetector?: new (options?: { formats?: string[] }) => {
      detect: (source: HTMLVideoElement) => Promise<Array<{ rawValue: string }>>;
    };
  }
}

export default function QRScanPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [roomInput, setRoomInput] = useState("204");
  const [status, setStatus] = useState("Camera scanner is optional. Use the demo scan if your browser blocks camera access.");
  const [scanning, setScanning] = useState(false);

  const goToRoom = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (/^https?:\/\//i.test(trimmed)) {
      const parsed = new URL(trimmed);
      router.push(`${parsed.pathname}${parsed.search}`);
      return;
    }
    router.push(`/room/${encodeURIComponent(trimmed)}`);
  };

  const startCameraScan = async () => {
    if (!window.BarcodeDetector) {
      setStatus("This browser does not expose BarcodeDetector. Use the simulated scan below.");
      return;
    }

    try {
      setScanning(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      const detector = new window.BarcodeDetector({ formats: ["qr_code"] });
      const scan = async () => {
        if (!videoRef.current || !scanning) return;
        const codes = await detector.detect(videoRef.current);
        if (codes[0]?.rawValue) {
          stopCamera();
          goToRoom(codes[0].rawValue);
          return;
        }
        requestAnimationFrame(scan);
      };
      requestAnimationFrame(scan);
      setStatus("Point the camera at a room QR code.");
    } catch {
      setScanning(false);
      setStatus("Camera access was blocked or unavailable. Use the simulated scan below.");
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setScanning(false);
  };

  useEffect(() => stopCamera, []);

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#222222] font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-[#EAE6DD] shadow-[0_24px_80px_rgba(201,168,76,0.06)] overflow-hidden">
        <div className="p-4 border-b border-[#F4EFE6] bg-[#FDFDFB] flex justify-between items-center">
          <Link href="/" className="flex items-center gap-1.5 text-xs font-semibold text-[#8C763F] hover:text-[#C9A84C]">
            <ArrowLeft className="w-3.5 h-3.5" />
            Hotel Hub
          </Link>
          <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">QR Room Scanner</span>
        </div>

        <div className="grid md:grid-cols-2">
          <div className="bg-[#1E293B] p-8 text-white">
            <div className="w-10 h-10 rounded-xl bg-[#C9A84C] flex items-center justify-center mb-6">
              <ScanLine className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Scan In-Room QR</h1>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              The QR encodes the room URL, so guests do not log in. Once scanned, the room and checked-in guest are loaded from the room page.
            </p>
            <div className="mt-6 bg-white p-4 rounded-xl inline-block">
              <img src="/api/qr/room/204" alt="QR code for room 204" className="w-44 h-44" />
            </div>
            <p className="text-[10px] text-slate-400 mt-2 font-mono">QR target: /room/204</p>
          </div>

          <div className="p-8 flex flex-col gap-5">
            <div>
              <h2 className="text-lg font-bold text-[#1C1917]">Scanner Options</h2>
              <p className="text-xs text-gray-500 mt-1">{status}</p>
            </div>

            <div className="relative bg-slate-50 border border-[#EAE6DD] rounded-xl overflow-hidden min-h-48 flex items-center justify-center">
              <video ref={videoRef} className="w-full h-48 object-cover" muted playsInline />
              {!scanning && (
                <div className="absolute text-center text-slate-400 text-xs flex flex-col items-center gap-2 pointer-events-none">
                  <QrCode className="w-8 h-8" />
                  Camera preview appears here
                </div>
              )}
            </div>

            <button
              onClick={scanning ? stopCamera : startCameraScan}
              className="bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-xs"
            >
              {scanning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
              {scanning ? "Stop Camera Scan" : "Start Camera Scan"}
            </button>

            <div className="h-[1px] bg-[#EAE6DD]" />

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#8C763F] uppercase tracking-wider block">
                Simulated Scan
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1 bg-slate-50 border border-[#EAE6DD] rounded-xl px-3 py-2 flex items-center gap-2">
                  <Key className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-400 font-mono">Room:</span>
                  <input
                    value={roomInput}
                    onChange={(event) => setRoomInput(event.target.value)}
                    className="w-full bg-transparent border-0 outline-none text-xs font-bold text-slate-800 font-mono"
                    placeholder="204"
                  />
                </div>
                <button
                  onClick={() => goToRoom(roomInput)}
                  className="bg-[#C9A84C] hover:bg-[#BFAE74] text-white px-4 rounded-xl transition-all shadow-sm active:scale-95"
                >
                  Scan
                </button>
              </div>
              <button
                onClick={() => goToRoom("204")}
                className="w-full bg-[#FAF8F5] hover:bg-[#F4EFE6] border border-[#EAE6DD] text-[#8C763F] p-3 rounded-xl font-semibold text-xs"
              >
                Scan Demo QR For Room 204
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
