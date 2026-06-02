import type { RequestItem } from "@/lib/requestDto";

export const VALID_REQUEST_TYPES = [
  "towels",
  "toiletries",
  "pillow",
  "soap",
  "blanket",
  "custom-entry",
];

export const VALID_STATUSES = [
  "PENDING",
  "ACKNOWLEDGED",
  "IN_PROGRESS",
  "DONE",
];

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  data?: {
    roomId: string;
    items: RequestItem[];
    customText?: string;
  };
}

export function validateRequestBody(body: unknown): ValidationResult {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    return { valid: false, errors: ["Request body must be a valid JSON object"] };
  }

  const { roomId, items, customText } = body as Record<string, unknown>;

  if (!roomId || typeof roomId !== "string") {
    errors.push("roomId is required and must be a string");
  } else if (!/^[a-zA-Z0-9-]{1,20}$/.test(roomId)) {
    errors.push("roomId must be alphanumeric with hyphens, max 20 characters");
  }

  if (!Array.isArray(items) || items.length === 0) {
    errors.push("items must contain at least one request item");
  } else if (items.length > VALID_REQUEST_TYPES.length) {
    errors.push(`items must contain at most ${VALID_REQUEST_TYPES.length} entries`);
  }

  const validatedItems: RequestItem[] = [];
  if (Array.isArray(items)) {
    const seenIds = new Set<string>();
    for (const item of items) {
      if (!item || typeof item !== "object") {
        errors.push("each item must be an object");
        continue;
      }

      const candidate = item as Record<string, unknown>;
      if (
        typeof candidate.id !== "string" ||
        !VALID_REQUEST_TYPES.includes(candidate.id)
      ) {
        errors.push(`item id must be one of: ${VALID_REQUEST_TYPES.join(", ")}`);
        continue;
      }
      if (seenIds.has(candidate.id)) {
        errors.push(`item '${candidate.id}' may only be submitted once`);
        continue;
      }
      if (
        typeof candidate.label !== "string" ||
        typeof candidate.emoji !== "string" ||
        typeof candidate.description !== "string"
      ) {
        errors.push("each item must include string id, emoji, label, and description fields");
        continue;
      }

      seenIds.add(candidate.id);
      validatedItems.push({
        id: candidate.id,
        emoji: candidate.emoji,
        label: candidate.label.trim().slice(0, 80),
        description: candidate.description.trim().slice(0, 200),
      });
    }
  }

  let sanitizedText: string | undefined;
  if (customText !== undefined && customText !== null) {
    if (typeof customText !== "string") {
      errors.push("customText must be a string");
    } else {
      sanitizedText = customText.trim();
      if (sanitizedText.length > 200) {
        errors.push("customText must be at most 200 characters");
      }
    }
  }

  if (errors.length > 0) return { valid: false, errors };

  return {
    valid: true,
    errors: [],
    data: {
      roomId: (roomId as string).toUpperCase(),
      items: validatedItems,
      customText: sanitizedText || undefined,
    },
  };
}

export function validateStatusTransition(
  fromStatus: string,
  toStatus: string
): { valid: boolean; error?: string } {
  const validTransitions: Record<string, string[]> = {
    PENDING: ["ACKNOWLEDGED"],
    ACKNOWLEDGED: ["IN_PROGRESS"],
    IN_PROGRESS: ["DONE"],
  };

  if (fromStatus === toStatus) {
    return { valid: false, error: "Status must be different from current" };
  }

  const allowedTransitions = validTransitions[fromStatus];
  if (!allowedTransitions?.includes(toStatus)) {
    return {
      valid: false,
      error: `Cannot transition from '${fromStatus}' to '${toStatus}'`,
    };
  }

  return { valid: true };
}

export function isValidCUID(id: string): boolean {
  return /^c[0-9a-z]{24}$/.test(id);
}
