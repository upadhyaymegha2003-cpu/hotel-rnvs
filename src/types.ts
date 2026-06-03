export type RequestStatus = 'PENDING' | 'ACKNOWLEDGED' | 'IN_PROGRESS' | 'DONE';

export interface RequestItem {
  id: string;
  emoji: string;
  label: string;
  description: string;
}

export interface GuestRequest {
  id: string;
  roomId: string;
  items: RequestItem[];
  customText?: string;
  status: RequestStatus;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  seenByStaff: boolean;
  assignedTo?: string;
  version: number;
}
