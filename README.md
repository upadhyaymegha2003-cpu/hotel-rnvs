# In-Room Guest Requests

A small hotel guest-service slice built with Next.js, Prisma, and SQLite. Guests open a room-specific URL, request amenities, and track progress. Staff see new work arrive live and advance it through delivery.

## Run Locally

Requires Node.js and npm.

```bash
npm install
npx prisma migrate dev
npm run db:seed
npm run dev
```

Open:

- Guest hub: `http://localhost:3000`
- Simulated room QR link: `http://localhost:3000/room/204`
- Staff dashboard: `http://localhost:3000/staff`

## Happy Path

1. Open `/room/204` and select one or more amenities.
2. Submit the request and leave the guest tracker open.
3. Open `/staff` in another tab. The request appears without refreshing.
4. Advance it from `PENDING` to `ACKNOWLEDGED`, `IN_PROGRESS`, and `DONE`.
5. Watch the guest tracker update after each staff action.

## What Is Built

- Mobile guest request screen driven by the room identifier in the URL.
- Staff queue with live incoming requests, lifecycle controls, unread markers, floor and status filters, and overdue highlighting.
- SQLite persistence through Prisma.
- Server-Sent Events (SSE) for guest and staff updates.
- Validation, per-room rate limiting, active-request duplicate prevention, and seeded demo data.

## Decisions And Tradeoffs

**SSE for realtime updates.** Updates only flow from the server to browsers, so SSE is a smaller fit than WebSockets: native browser support, automatic reconnects, and one HTTP stream. In a multi-instance deployment the in-memory broadcaster would need Redis pub/sub or another shared event bus.

**One persisted request can contain several items.** The guest UI naturally allows a single dispatch containing towels and toiletries together. Items are stored as JSON because SQLite keeps the local take-home simple. For production analytics and inventory integration, I would normalize items into a related table.

**Explicit forward-only statuses.** Requests move through `PENDING -> ACKNOWLEDGED -> IN_PROGRESS -> DONE`. This avoids accidental backward movement and makes the guest timeline predictable. Cancellation and reopening are intentionally deferred until their product semantics are clear.

**Duplicate overlap checks and rate limiting.** A room cannot submit an item already present in an unfinished request, and each room is capped at five submissions per ten minutes. This reduces accidental repeat taps and abuse while allowing another request once prior work is complete. The limiter is in memory for local use; production needs shared storage such as Redis.

**No authentication.** The guest room comes from the simulated QR URL as required. A real product should use signed, rotatable QR tokens so changing `/room/204` to another room is not enough to impersonate that room. Staff authentication and authorization are also required before production use.

## Edge Cases

Handled:

- Empty submissions, malformed item payloads, invalid rooms, duplicate item IDs, oversized notes, unknown statuses, invalid transitions, missing records, repeat active requests, request bursts, disconnected SSE clients, and overdue pending work.

Deferred:

- Cross-instance event delivery and distributed rate limits.
- Signed QR links and staff auth.
- Cancellation, reopening, assignment to a staff member, and audit history.
- Database-level optimistic locking for two staff members advancing the same card at the exact same instant. Forward-only transitions limit the impact locally; production should use a conditional update or version column.

## Useful Commands

```bash
npm run build
npm run db:seed
npm run dev
```

## Next Steps

I would add browser-level tests for the happy path, signed QR tokens, staff auth, request ownership, an audit log, Redis-backed realtime delivery and rate limiting, and a normalized request-item table once reporting or inventory workflows need it.
