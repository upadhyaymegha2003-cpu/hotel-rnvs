import { NextRequest, NextResponse } from "next/server";
import { readStaffSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const username = readStaffSession(request);
  return username
    ? NextResponse.json({ username })
    : NextResponse.json({ error: "unauthorized" }, { status: 401 });
}
