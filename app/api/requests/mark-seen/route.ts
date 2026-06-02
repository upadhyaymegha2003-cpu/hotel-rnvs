import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { broadcaster } from "@/lib/sse";

export async function POST() {
  try {
    await prisma.request.updateMany({
      where: { seenByStaff: false },
      data: { seenByStaff: true },
    });
    broadcaster.broadcast("MARK_SEEN");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[POST /api/requests/mark-seen]", error);
    return NextResponse.json(
      { error: "server_error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
