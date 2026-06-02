export type SSEEventType = "CONNECTED" | "CREATE" | "UPDATE" | "MARK_SEEN";

export class SSEBroadcaster {
  private clients = new Set<ReadableStreamController<Uint8Array>>();
  private messageId = 0;

  subscribe(controller: ReadableStreamController<Uint8Array>) {
    this.clients.add(controller);
  }

  unsubscribe(controller: ReadableStreamController<Uint8Array>) {
    this.clients.delete(controller);
  }

  broadcast(type: SSEEventType, data?: unknown) {
    const payload = JSON.stringify({ type, data });
    const message = `id: ${++this.messageId}\ndata: ${payload}\n\n`;
    const encoded = new TextEncoder().encode(message);

    for (const client of this.clients) {
      try {
        client.enqueue(encoded);
      } catch {
        this.clients.delete(client);
      }
    }
  }

  getClientCount() {
    return this.clients.size;
  }
}

export const broadcaster = new SSEBroadcaster();
