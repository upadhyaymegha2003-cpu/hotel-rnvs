export interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export class RateLimiter {
  private storage: Map<string, RateLimitEntry> = new Map();
  private readonly limit: number;
  private readonly windowMs: number;

  constructor(limit: number = 5, windowMs: number = 10 * 60 * 1000) {
    this.limit = limit;
    this.windowMs = windowMs;
  }

  checkRateLimit(
    key: string
  ): {
    allowed: boolean;
    retryAfter?: number;
  } {
    const now = Date.now();
    const entry = this.storage.get(key);

    // Entry doesn't exist or window has expired
    if (!entry || now >= entry.resetAt) {
      this.storage.set(key, {
        count: 1,
        resetAt: now + this.windowMs,
      });
      return { allowed: true };
    }

    // Within window: increment counter
    entry.count++;

    if (entry.count > this.limit) {
      const retryAfterMs = entry.resetAt - now;
      const retryAfterSeconds = Math.ceil(retryAfterMs / 1000);
      return {
        allowed: false,
        retryAfter: retryAfterSeconds,
      };
    }

    return { allowed: true };
  }

  reset(key: string) {
    this.storage.delete(key);
  }

  // Cleanup expired entries
  cleanup() {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, entry] of this.storage.entries()) {
      if (now >= entry.resetAt) {
        keysToDelete.push(key);
      }
    }

    for (const key of keysToDelete) {
      this.storage.delete(key);
    }
  }
}

// Singleton instance: 5 requests per 10 minutes
export const rateLimiter = new RateLimiter(5, 10 * 60 * 1000);

// Optional: cleanup every minute
if (typeof global !== "undefined") {
  setInterval(() => {
    rateLimiter.cleanup();
  }, 60 * 1000);
}
