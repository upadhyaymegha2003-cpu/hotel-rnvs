import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readStaffSession } from "@/lib/auth";
import { isValidCUID } from "@/lib/validators";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!readStaffSession(request)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { id } = await params;
  if (!isValidCUID(id)) return NextResponse.json({ error: "invalid_id" }, { status: 400 });
  const logs = await prisma.auditLog.findMany({ where: { requestId: id }, orderBy: { createdAt: "asc" } });
  return NextResponse.json(logs.map((log) => ({ ...log, createdAt: log.createdAt.toISOString() })));
}
