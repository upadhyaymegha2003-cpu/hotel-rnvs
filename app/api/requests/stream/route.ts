import { NextRequest } from "next/server";
import { readStaffSession } from "@/lib/auth";
import { roomTokenIsValid } from "@/lib/roomTokens";
import { broadcaster } from "@/lib/sse";

export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const staff = readStaffSession(request);
  const roomId = request.nextUrl.searchParams.get("roomId");
  const roomToken = request.nextUrl.searchParams.get("token");
  if (!staff && (!roomId || !roomTokenIsValid(roomId, roomToken))) {
    return new Response("A valid room link or staff login is required", { status: 401 });
  }

  let subscription: ReturnType<typeof broadcaster.subscribe>;
  let keepalive: ReturnType<typeof setInterval>;
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      subscription = broadcaster.subscribe(controller, staff ? undefined : roomId!.toUpperCase());
      controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ type: "CONNECTED" })}\n\n`));
      keepalive = setInterval(() => {
        try {
          controller.enqueue(new TextEncoder().encode(": keepalive\n\n"));
        } catch {
          clearInterval(keepalive);
          broadcaster.unsubscribe(subscription);
        }
      }, 30000);
    },
    cancel() {
      clearInterval(keepalive);
      broadcaster.unsubscribe(subscription);
    },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
