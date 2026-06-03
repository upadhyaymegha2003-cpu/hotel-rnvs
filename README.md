# In-Room Guest Requests

A Next.js, Prisma, and SQLite hotel guest-service app. Guests request amenities from a room-specific QR URL, staff receive the work live, and guests see delivery progress without refreshing.

## Run Locally

```bash
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Open:

- Home: `http://localhost:3000`
- Local guest demo: `http://localhost:3000/room/204`
- QR scanner simulation: `http://localhost:3000/scan`
- Room 204 QR image: `http://localhost:3000/api/qr/room/204`
- Staff dashboard: `http://localhost:3000/staff`
- Database viewer: run `npx prisma studio`, then open `http://localhost:5555`

Default local staff credentials:

```text
username: concierge
password: concierge-demo
```

Copy `.env.example` to `.env` and replace the demo secrets before deployment.

## Happy Path

1. Open `/staff` and log in.
2. Open `/scan`, scan the demo Room 204 QR, or click `Scan Demo QR For Room 204`.
3. Confirm the guest room screen shows `Room 204` and checked-in guest `Priya Sharma`.
4. Select amenities and submit.
5. Watch the request appear live on the staff dashboard.
6. Advance it from `PENDING` to `ACKNOWLEDGED`, `IN_PROGRESS`, and `DONE`.
7. Watch the guest timeline update after each action.

Plain room URLs are enabled automatically in development for quick testing. Production requires a signed QR URL.

## Signed Room URLs

Staff can generate a signed room path after logging in:

```powershell
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
Invoke-RestMethod -WebSession $session -Method Post `
  -Uri http://localhost:3000/api/auth/login `
  -ContentType "application/json" `
  -Body '{"username":"concierge","password":"concierge-demo"}'

Invoke-RestMethod -WebSession $session -Method Post `
  -Uri http://localhost:3000/api/room-links `
  -ContentType "application/json" `
  -Body '{"roomId":"204"}'
```

The returned `/room/204?token=...` path expires after 24 hours. In a real hotel workflow, that path would be encoded into the QR card placed in the room.

## QR And Checked-In Guests

The app now serves a real SVG QR code for any room:

```text
GET /api/qr/room/204
```

That QR points to `/room/204`, matching the take-home requirement that the room comes from the URL rather than a guest login. The `/scan` page provides two paths:

- Camera scan using the browser `BarcodeDetector` API when available.
- A deterministic simulated scan button for Room 204.

Room guest names are hardcoded for the demo in `lib/guestRegistry.ts`. Room 204 is assigned to `Priya Sharma`, so after scanning the Room 204 QR the guest screen displays both the room number and checked-in guest name.

## What Is Built

- Mobile room-specific guest portal with multi-item requests and custom notes.
- Real SVG QR generation for room URLs and a scanner/simulation screen.
- Hardcoded checked-in guest lookup displayed on the guest room screen.
- Staff authentication with signed, HTTP-only session cookies.
- Signed, expiring room-link tokens.
- Staff dashboard with live arrival, lifecycle controls, floor filters, unread state, overdue highlighting, and automatic request ownership.
- Normalized SQL `RequestItem` rows for reporting and inventory integrations.
- `AuditLog` rows for creation, seen actions, assignment, and status changes.
- Optimistic concurrency through a request `version` field.
- SSE realtime delivery scoped to a guest room.
- Optional Redis-backed pub/sub and distributed rate limiting.
- API integration tests and a Playwright browser happy-path test.

## Realtime And Redis

SSE fits this app because updates travel from the server to browsers. It is simpler than WebSockets and browsers reconnect automatically.

Without `REDIS_URL`, local development uses an in-memory broadcaster and rate limiter. With `REDIS_URL`, events use Redis pub/sub and rate-limit counters use Redis keys, allowing multiple Next.js instances to share state.

```env
REDIS_URL="redis://localhost:6379"
```

Redis is optional for local development but required before horizontally scaling the app.

## Database

SQLite data is stored in `prisma/dev.db`.

```bash
npx prisma studio
```

Useful Prisma Studio tables:

- `Request`: room, lifecycle, owner, seen state, and concurrency version.
- `RequestItem`: normalized amenities linked to requests.
- `AuditLog`: actor and action history.

Authenticated staff can also inspect one request's history:

```text
GET /api/requests/:id/audit
```

## Tests

Start the built server for API tests:

```bash
npm run build
npm start
```

In another terminal:

```bash
npm test
```

Install Playwright Chromium once, then run the browser flow:

```bash
npx playwright install chromium
npm run test:browser
```

## Decisions And Tradeoffs

**Normalized request items.** Each amenity is a `RequestItem` row rather than JSON. This makes reporting and inventory workflows straightforward while preserving one guest submission as one request.

**Forward-only lifecycle.** Requests move through `PENDING -> ACKNOWLEDGED -> IN_PROGRESS -> DONE`. Cancellation and reopening need explicit product rules, so they are not guessed into the workflow.

**Automatic ownership.** The first staff member who acts on a request becomes its owner. This is intentionally lightweight; a larger team would need reassignment controls and role-based permissions.

**Optimistic concurrency.** Updates increment a version and only succeed if nobody changed the request since it was read. This prevents silent overwrites when staff act at the same moment.

**Local fallbacks.** SQLite and in-memory Redis fallbacks keep the project easy to run. Production should use a managed SQL database, Redis, rotated secrets, HTTPS, staff identity management, and operational monitoring.

## Remaining Production Work

- Replace demo staff credentials with SSO or a real identity provider.
- Add role-based staff permissions and explicit reassignment controls.
- Add QR token rotation and revocation.
- Move SQLite to PostgreSQL for multi-instance writes.
- Add monitoring, structured logs, and Redis failure metrics.
- Expand Playwright coverage for expiry, invalid links, conflicts, and reconnect behavior.
