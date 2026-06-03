import { getRedisClient } from "@/lib/redis";

interface Entry {
  count: number;
  resetAt: number;
}

export class RateLimiter {
  private storage = new Map<string, Entry>();

  constructor(
    private readonly limit = 5,
    private readonly windowMs = 10 * 60 * 1000
  ) {}

  async checkRateLimit(key: string) {
    const redis = await getRedisClient();
    if (redis) {
      const redisKey = `hotel:rate-limit:${key}`;
      const count = await redis.incr(redisKey);
      if (count === 1) await redis.pExpire(redisKey, this.windowMs);
      if (count > this.limit) {
        return { allowed: false, retryAfter: Math.ceil((await redis.pTTL(redisKey)) / 1000) };
      }
      return { allowed: true };
    }

    const now = Date.now();
    const entry = this.storage.get(key);
    if (!entry || now >= entry.resetAt) {
      this.storage.set(key, { count: 1, resetAt: now + this.windowMs });
      return { allowed: true };
    }
    entry.count++;
    return entry.count > this.limit
      ? { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) }
      : { allowed: true };
  }
}

export const rateLimiter = new RateLimiter();
