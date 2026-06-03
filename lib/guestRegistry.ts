export interface CheckedInGuest {
  roomId: string;
  guestName: string;
  reservationCode: string;
  checkoutDate: string;
}

const checkedInGuests: Record<string, CheckedInGuest> = {
  "101": {
    roomId: "101",
    guestName: "Aarav Mehta",
    reservationCode: "GS-101-AM",
    checkoutDate: "2026-06-06",
  },
  "204": {
    roomId: "204",
    guestName: "Priya Sharma",
    reservationCode: "GS-204-PS",
    checkoutDate: "2026-06-07",
  },
  "302": {
    roomId: "302",
    guestName: "Rahul Verma",
    reservationCode: "GS-302-RV",
    checkoutDate: "2026-06-05",
  },
  "405": {
    roomId: "405",
    guestName: "Ananya Rao",
    reservationCode: "GS-405-AR",
    checkoutDate: "2026-06-08",
  },
};

export function getCheckedInGuest(roomId: string): CheckedInGuest {
  const normalizedRoomId = roomId.toUpperCase();
  return (
    checkedInGuests[normalizedRoomId] || {
      roomId: normalizedRoomId,
      guestName: "Checked-in Guest",
      reservationCode: `GS-${normalizedRoomId}`,
      checkoutDate: "2026-06-07",
    }
  );
}
