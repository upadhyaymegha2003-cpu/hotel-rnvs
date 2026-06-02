import { broadcaster } from "@/lib/sse";

export const dynamic = "force-dynamic";

export function GET() {
  let controller: ReadableStreamController<Uint8Array>;
  let keepalive: ReturnType<typeof setInterval>;

  const stream = new ReadableStream<Uint8Array>({
    start(streamController) {
      controller = streamController;
      broadcaster.subscribe(controller);
      controller.enqueue(
        new TextEncoder().encode(`data: ${JSON.stringify({ type: "CONNECTED" })}\n\n`)
      );
      keepalive = setInterval(() => {
        try {
          controller.enqueue(new TextEncoder().encode(": keepalive\n\n"));
        } catch {
          clearInterval(keepalive);
          broadcaster.unsubscribe(controller);
        }
      }, 30000);
    },
    cancel() {
      clearInterval(keepalive);
      broadcaster.unsubscribe(controller);
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
