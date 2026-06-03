import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

export const STAFF_COOKIE = "hotel_staff_session";
const SESSION_TTL_SECONDS = 8 * 60 * 60;

function secret() {
  return process.env.AUTH_SECRET || "local-development-auth-secret-change-me";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

function matchesSignature(value: string, signature: string) {
  const expected = Buffer.from(sign(value));
  const actual = Buffer.from(signature);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function createStaffSession(username: string) {
  const payload = Buffer.from(
    JSON.stringify({ username, expiresAt: Date.now() + SESSION_TTL_SECONDS * 1000 })
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function readStaffSession(request: NextRequest): string | null {
  const token = request.cookies.get(STAFF_COOKIE)?.value;
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !matchesSignature(payload, signature)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return session.expiresAt > Date.now() && typeof session.username === "string"
      ? session.username
      : null;
  } catch {
    return null;
  }
}

export function staffCredentialsAreValid(username: string, password: string) {
  const configuredUsername = process.env.STAFF_USERNAME || "concierge";
  const configuredPassword = process.env.STAFF_PASSWORD || "concierge-demo";
  return username === configuredUsername && password === configuredPassword;
}

export const staffCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
};
