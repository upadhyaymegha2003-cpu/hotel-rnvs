import type { Prisma, RequestItem as PrismaRequestItem } from "@prisma/client";

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
  assignedTo?: string;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export const requestWithItems = {
  items: true,
} satisfies Prisma.RequestInclude;

type RequestWithItems = Prisma.RequestGetPayload<{ include: typeof requestWithItems }>;

export function serializeRequest(request: RequestWithItems): RequestDto {
  return {
    id: request.id,
    roomId: request.roomId,
    items: request.items.map(serializeItem),
    customText: request.customText || undefined,
    status: request.status,
    seenByStaff: request.seenByStaff,
    assignedTo: request.assignedTo || undefined,
    version: request.version,
    createdAt: request.createdAt.toISOString(),
    updatedAt: request.updatedAt.toISOString(),
  };
}

function serializeItem(item: PrismaRequestItem): RequestItem {
  return {
    id: item.type,
    emoji: item.emoji,
    label: item.label,
    description: item.description,
  };
}
