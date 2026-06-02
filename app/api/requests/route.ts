import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimiter } from "@/lib/rateLimit";
import { parseItems, serializeRequest } from "@/lib/requestDto";
import { validateRequestBody } from "@/lib/validators";
import { broadcaster } from "@/lib/sse";

export async function GET() {
  try {
    const requests = await prisma.request.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(requests.map(serializeRequest));
  } catch (error) {
    console.error("[GET /api/requests]", error);
    return NextResponse.json(
      { error: "server_error", message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "validation_error", message: "Request body must be valid JSON" },
        { status: 400 }
      );
    }

    const validation = validateRequestBody(body);
    if (!validation.valid) {
      return NextResponse.json(
        {
          error: "validation_error",
          message: "Invalid request body",
          details: { errors: validation.errors },
        },
        { status: 400 }
      );
    }

    const { roomId, items, customText } = validation.data!;
    const rateLimit = rateLimiter.checkRateLimit(roomId);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "rate_limited",
          message: "Too many requests from this room",
          details: { retryAfter: rateLimit.retryAfter },
        },
        {
          status: 429,
          headers: { "Retry-After": String(rateLimit.retryAfter) },
        }
      );
    }

    const activeRequests = await prisma.request.findMany({
      where: { roomId, status: { not: "DONE" } },
    });
    const submittedIds = new Set(items.map((item) => item.id));
    const duplicate = activeRequests.find((activeRequest) =>
      parseItems(activeRequest.itemsJson).some((item) => submittedIds.has(item.id))
    );
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

    const newRequest = await prisma.request.create({
      data: {
        roomId,
        itemsJson: JSON.stringify(items),
        customText: customText || null,
      },
    });
    const dto = serializeRequest(newRequest);
    broadcaster.broadcast("CREATE", dto);
    return NextResponse.json(dto, { status: 201 });
  } catch (error) {
    console.error("[POST /api/requests]", error);
    return NextResponse.json(
      { error: "server_error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
