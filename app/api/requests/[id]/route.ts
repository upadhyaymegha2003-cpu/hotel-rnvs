import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeRequest } from "@/lib/requestDto";
import {
  isValidCUID,
  validateStatusTransition,
  VALID_STATUSES,
} from "@/lib/validators";
import { broadcaster } from "@/lib/sse";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!isValidCUID(id)) {
      return NextResponse.json(
        { error: "invalid_id", message: "Invalid request ID format" },
        { status: 400 }
      );
    }

    const record = await prisma.request.findUnique({ where: { id } });
    if (!record) {
      return NextResponse.json(
        { error: "not_found", message: "Request not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(serializeRequest(record));
  } catch (error) {
    console.error("[GET /api/requests/[id]]", error);
    return NextResponse.json(
      { error: "server_error", message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!isValidCUID(id)) {
      return NextResponse.json(
        { error: "invalid_id", message: "Invalid request ID format" },
        { status: 400 }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json(
        { error: "validation_error", message: "Request body must be valid JSON" },
        { status: 400 }
      );
    }
    const status = body.status;
    const seenByStaff = body.seenByStaff;
    if (status === undefined && seenByStaff !== true) {
      return NextResponse.json(
        { error: "validation_error", message: "Provide status or seenByStaff: true" },
        { status: 400 }
      );
    }
    if (status !== undefined && (typeof status !== "string" || !VALID_STATUSES.includes(status))) {
      return NextResponse.json(
        { error: "validation_error", message: `status must be one of: ${VALID_STATUSES.join(", ")}` },
        { status: 400 }
      );
    }

    const existing = await prisma.request.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "not_found", message: "Request not found" },
        { status: 404 }
      );
    }
    if (typeof status === "string") {
      const transition = validateStatusTransition(existing.status, status);
      if (!transition.valid) {
        return NextResponse.json(
          {
            error: "invalid_transition",
            message: transition.error,
            details: { from: existing.status, to: status },
          },
          { status: 409 }
        );
      }
    }

    const updated = await prisma.request.update({
      where: { id },
      data: {
        status: typeof status === "string" ? status : undefined,
        seenByStaff: seenByStaff === true ? true : undefined,
      },
    });
    const dto = serializeRequest(updated);
    broadcaster.broadcast("UPDATE", dto);
    return NextResponse.json(dto);
  } catch (error) {
    console.error("[PATCH /api/requests/[id]]", error);
    return NextResponse.json(
      { error: "server_error", message: "Internal server error" },
      { status: 500 }
    );
  }
}
