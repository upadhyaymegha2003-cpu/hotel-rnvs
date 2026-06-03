import { NextRequest, NextResponse } from "next/server";
import { createStaffSession, STAFF_COOKIE, staffCookieOptions, staffCredentialsAreValid } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();
  if (typeof username !== "string" || typeof password !== "string" || !staffCredentialsAreValid(username, password)) {
    return NextResponse.json({ error: "invalid_credentials", message: "Invalid staff credentials" }, { status: 401 });
  }
  const response = NextResponse.json({ username });
  response.cookies.set(STAFF_COOKIE, createStaffSession(username), staffCookieOptions);
  return response;
}
