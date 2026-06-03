#!/usr/bin/env node

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
let passed = 0;
let staffCookie = "";

function assert(condition, message) {
  if (!condition) throw new Error(message);
  passed++;
  console.log(`PASS ${message}`);
}

async function json(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  if (staffCookie) headers.cookie = staffCookie;
  const response = await fetch(BASE_URL + path, { ...options, headers });
  return { response, body: await response.json() };
}

async function login() {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username: "concierge", password: "concierge-demo" }),
  });
  assert(response.status === 200, "staff logs in");
  staffCookie = response.headers.get("set-cookie").split(";")[0];
}

async function run() {
  await login();
  const roomId = `TEST${Date.now().toString().slice(-8)}`;
  const items = [
    { id: "towels", emoji: "bath", label: "Fresh Towels", description: "Soft towels" },
    { id: "pillow", emoji: "bed", label: "Extra Pillow", description: "Extra pillow" },
  ];
  const link = await json("/api/room-links", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ roomId }),
  });
  assert(link.response.status === 200 && link.body.path.includes("token="), "staff generates signed room link");

  const qr = await fetch(`${BASE_URL}/api/qr/room/204`);
  const qrSvg = await qr.text();
  assert(qr.status === 200 && qr.headers.get("content-type").includes("image/svg+xml") && qrSvg.includes("<svg"), "room 204 QR SVG is generated");

  const room204 = await json("/api/rooms/204");
  assert(room204.response.status === 200 && room204.body.guestName === "Priya Sharma", "room 204 resolves checked-in guest name");

  const abort = new AbortController();
  const stream = await fetch(`${BASE_URL}/api/requests/stream`, { headers: { cookie: staffCookie }, signal: abort.signal });
  assert(stream.status === 200, "authenticated SSE endpoint connects");

  let streamText = "";
  const reader = stream.body.getReader();
  const decoder = new TextDecoder();
  const streamLoop = (async () => {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        streamText += decoder.decode(value);
      }
    } catch {}
  })();

  const create = await json("/api/requests", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ roomId, roomToken: link.body.token, items }),
  });
  assert(create.response.status === 201, "guest creates a normalized multi-item request");

  const update = await json(`/api/requests/${create.body.id}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ status: "ACKNOWLEDGED", seenByStaff: true }),
  });
  assert(update.response.status === 200 && update.body.assignedTo === "concierge", "staff update claims request ownership");

  const audit = await json(`/api/requests/${create.body.id}/audit`);
  assert(audit.response.status === 200 && audit.body.some((entry) => entry.action === "STATUS_CHANGED"), "audit log records staff status change");

  await new Promise((resolve) => setTimeout(resolve, 100));
  assert(streamText.includes('"type":"CREATE"') && streamText.includes('"type":"UPDATE"'), "SSE emits shared realtime events");
  abort.abort();
  await streamLoop;
  console.log(`\n${passed} checks passed`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
