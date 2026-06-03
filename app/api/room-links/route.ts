import { NextRequest, NextResponse } from "next/server";
import { readStaffSession } from "@/lib/auth";
import { createRoomToken } from "@/lib/roomTokens";

export async function POST(request: NextRequest) {
  if (!readStaffSession(request)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { roomId } = await request.json();
  if (typeof roomId !== "string" || !/^[a-zA-Z0-9-]{1,20}$/.test(roomId)) {
    return NextResponse.json({ error: "validation_error", message: "A valid roomId is required" }, { status: 400 });
  }
  const normalizedRoomId = roomId.toUpperCase();
  const token = createRoomToken(normalizedRoomId);
  return NextResponse.json({ roomId: normalizedRoomId, token, path: `/room/${normalizedRoomId}?token=${encodeURIComponent(token)}` });
}
