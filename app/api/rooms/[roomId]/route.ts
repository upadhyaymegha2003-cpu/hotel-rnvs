import { NextRequest, NextResponse } from "next/server";
import { getCheckedInGuest } from "@/lib/guestRegistry";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const { roomId } = await params;
  return NextResponse.json(getCheckedInGuest(roomId));
}
