import { getRedisClient } from "@/lib/redis";

export type SSEEventType = "CONNECTED" | "CREATE" | "UPDATE" | "MARK_SEEN";
type Subscription = {
  controller: ReadableStreamController<Uint8Array>;
  roomId?: string;
};

const CHANNEL = "hotel:request-events";

export class SSEBroadcaster {
  private clients = new Set<Subscription>();
  private messageId = 0;
  private subscriberStarted = false;

  subscribe(controller: ReadableStreamController<Uint8Array>, roomId?: string) {
    const subscription = { controller, roomId };
    this.clients.add(subscription);
    void this.startRedisSubscriber();
    return subscription;
  }

  unsubscribe(subscription: Subscription) {
    this.clients.delete(subscription);
  }

  async broadcast(type: SSEEventType, data?: unknown) {
    const payload = { type, data };
    const redis = await getRedisClient();
    if (redis) {
      await redis.publish(CHANNEL, JSON.stringify(payload));
    } else {
      this.deliver(payload);
    }
  }

  private deliver(payload: { type: SSEEventType; data?: any }) {
    const encoded = new TextEncoder().encode(
      `id: ${++this.messageId}\ndata: ${JSON.stringify(payload)}\n\n`
    );
    for (const subscription of this.clients) {
      if (
        subscription.roomId &&
        payload.data?.roomId &&
        subscription.roomId !== payload.data.roomId
      ) continue;
      try {
        subscription.controller.enqueue(encoded);
      } catch {
        this.clients.delete(subscription);
      }
    }
  }

  private async startRedisSubscriber() {
    if (this.subscriberStarted) return;
    const redis = await getRedisClient();
    if (!redis) return;
    this.subscriberStarted = true;
    const subscriber = redis.duplicate();
    subscriber.on("error", (error) => console.error("[redis subscriber]", error.message));
    await subscriber.connect();
    await subscriber.subscribe(CHANNEL, (message) => this.deliver(JSON.parse(message)));
  }
}

export const broadcaster = new SSEBroadcaster();
