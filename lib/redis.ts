import { createClient, type RedisClientType } from "redis";

let client: RedisClientType | null = null;
let connecting: Promise<RedisClientType | null> | null = null;

export async function getRedisClient() {
  if (!process.env.REDIS_URL) return null;
  if (client?.isReady) return client;
  if (connecting) return connecting;

  connecting = (async () => {
    const nextClient = createClient({ url: process.env.REDIS_URL });
    nextClient.on("error", (error) => console.error("[redis]", error.message));
    try {
      await nextClient.connect();
      client = nextClient as RedisClientType;
      return client;
    } catch (error) {
      console.error("[redis] falling back to in-memory mode", error);
      return null;
    } finally {
      connecting = null;
    }
  })();
  return connecting;
}
