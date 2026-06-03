import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readStaffSession } from "@/lib/auth";
import { rateLimiter } from "@/lib/rateLimit";
import { requestWithItems, serializeRequest } from "@/lib/requestDto";
import { roomTokenIsValid } from "@/lib/roomTokens";
import { validateRequestBody } from "@/lib/validators";
import { broadcaster } from "@/lib/sse";

export async function GET(request: NextRequest) {
  if (!readStaffSession(request)) {
    return NextResponse.json({ error: "unauthorized", message: "Staff login required" }, { status: 401 });
  }
  try {
    const requests = await prisma.request.findMany({
      include: requestWithItems,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(requests.map(serializeRequest));
  } catch (error) {
    console.error("[GET /api/requests]", error);
    return NextResponse.json({ error: "server_error", message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "validation_error", message: "Request body must be valid JSON" }, { status: 400 });
    }

    const validation = validateRequestBody(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: "validation_error", message: "Invalid request body", details: { errors: validation.errors } },
        { status: 400 }
      );
    }

    const { roomId, items, customText } = validation.data!;
    const roomToken = (body as Record<string, unknown>).roomToken;
    if (!roomTokenIsValid(roomId, typeof roomToken === "string" ? roomToken : null)) {
      return NextResponse.json({ error: "invalid_room_token", message: "Room link is missing, invalid, or expired" }, { status: 403 });
    }

    const rateLimit = await rateLimiter.checkRateLimit(roomId);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "rate_limited", message: "Too many requests from this room", details: { retryAfter: rateLimit.retryAfter } },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } }
      );
    }

    const itemTypes = items.map((item) => item.id);
    const duplicate = await prisma.request.findFirst({
      where: {
        roomId,
        status: { not: "DONE" },
        items: { some: { type: { in: itemTypes } } },
      },
    });
    if (duplicate) {
      return NextResponse.json(
        {
          error: "duplicate",
          message: "One or more selected items already have an active request",
          details: { existingId: duplicate.id, status: duplicate.status },
        },
        { status: 409 }
      );
    }

    const created = await prisma.request.create({
      include: requestWithItems,
      data: {
        roomId,
        customText: customText || null,
        items: {
          create: items.map((item) => ({
            type: item.id,
            emoji: item.emoji,
            label: item.label,
            description: item.description,
          })),
        },
        auditLogs: { create: { action: "CREATED", actor: `guest:${roomId}` } },
      },
    });
    const dto = serializeRequest(created);
    await broadcaster.broadcast("CREATE", dto);
    return NextResponse.json(dto, { status: 201 });
  } catch (error) {
    console.error("[POST /api/requests]", error);
    return NextResponse.json({ error: "server_error", message: "Internal server error" }, { status: 500 });
  }
}
