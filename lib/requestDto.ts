import type { Request } from "@prisma/client";

export interface RequestItem {
  id: string;
  emoji: string;
  label: string;
  description: string;
}

export interface RequestDto {
  id: string;
  roomId: string;
  items: RequestItem[];
  customText?: string;
  status: string;
  seenByStaff: boolean;
  createdAt: string;
  updatedAt: string;
}

export function parseItems(itemsJson: string): RequestItem[] {
  try {
    const parsed = JSON.parse(itemsJson);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function serializeRequest(request: Request): RequestDto {
  return {
    id: request.id,
    roomId: request.roomId,
    items: parseItems(request.itemsJson),
    customText: request.customText || undefined,
    status: request.status,
    seenByStaff: request.seenByStaff,
    createdAt: request.createdAt.toISOString(),
    updatedAt: request.updatedAt.toISOString(),
  };
}
