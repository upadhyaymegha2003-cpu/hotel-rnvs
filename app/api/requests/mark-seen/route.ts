import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readStaffSession } from "@/lib/auth";
import { broadcaster } from "@/lib/sse";

export async function POST(request: NextRequest) {
  const staffUsername = readStaffSession(request);
  if (!staffUsername) return NextResponse.json({ error: "unauthorized", message: "Staff login required" }, { status: 401 });
  try {
    const unseen = await prisma.request.findMany({ where: { seenByStaff: false }, select: { id: true } });
    await prisma.$transaction([
      prisma.request.updateMany({ where: { seenByStaff: false }, data: { seenByStaff: true } }),
      ...unseen.map(({ id }) =>
        prisma.auditLog.create({ data: { requestId: id, action: "MARKED_SEEN", actor: `staff:${staffUsername}` } })
      ),
    ]);
    await broadcaster.broadcast("MARK_SEEN");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[POST /api/requests/mark-seen]", error);
    return NextResponse.json({ error: "server_error", message: "Internal server error" }, { status: 500 });
  }
}
