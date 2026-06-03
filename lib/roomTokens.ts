import { createHmac, timingSafeEqual } from "node:crypto";

const TOKEN_TTL_SECONDS = 24 * 60 * 60;

function secret() {
  return process.env.ROOM_TOKEN_SECRET || process.env.AUTH_SECRET || "local-development-room-secret-change-me";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

export function createRoomToken(roomId: string) {
  const payload = Buffer.from(
    JSON.stringify({ roomId: roomId.toUpperCase(), expiresAt: Date.now() + TOKEN_TTL_SECONDS * 1000 })
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function roomTokenIsValid(roomId: string, token?: string | null) {
  if (!token) return unsignedRoomLinksAllowed();
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = Buffer.from(sign(payload));
  const actual = Buffer.from(signature);
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return data.roomId === roomId.toUpperCase() && data.expiresAt > Date.now();
  } catch {
    return false;
  }
}

function unsignedRoomLinksAllowed() {
  return process.env.ALLOW_UNSIGNED_ROOM_LINKS === "true" || process.env.NODE_ENV !== "production";
}
