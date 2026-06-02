#!/usr/bin/env node

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
let passed = 0;

function assert(condition, message) {
  if (!condition) throw new Error(message);
  passed++;
  console.log(`PASS ${message}`);
}

async function json(path, options) {
  const response = await fetch(BASE_URL + path, options);
  return { response, body: await response.json() };
}

async function run() {
  const roomId = `TEST${Date.now().toString().slice(-8)}`;
  const items = [
    { id: "towels", emoji: "bath", label: "Fresh Towels", description: "Soft towels" },
    { id: "pillow", emoji: "bed", label: "Extra Pillow", description: "Extra pillow" },
  ];
  const abort = new AbortController();
  const stream = await fetch(`${BASE_URL}/api/requests/stream`, { signal: abort.signal });
  assert(stream.status === 200, "SSE endpoint connects");

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
    body: JSON.stringify({ roomId, items }),
  });
  assert(create.response.status === 201, "guest creates a multi-item request");
  assert(create.body.status === "PENDING" && create.body.items.length === 2, "create response matches UI contract");

  const duplicate = await json("/api/requests", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ roomId, items: [items[0]] }),
  });
  assert(duplicate.response.status === 409, "active duplicate item is rejected");

  const malformed = await fetch(`${BASE_URL}/api/requests`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{",
  });
  assert(malformed.status === 400, "malformed JSON is rejected as a client error");

  const update = await json(`/api/requests/${create.body.id}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ status: "ACKNOWLEDGED", seenByStaff: true }),
  });
  assert(update.response.status === 200 && update.body.status === "ACKNOWLEDGED", "staff advances request status");

  const markSeen = await json("/api/requests/mark-seen", { method: "POST" });
  assert(markSeen.response.status === 200, "staff marks all requests seen");

  const list = await json("/api/requests");
  assert(Array.isArray(list.body) && list.body.some((request) => request.id === create.body.id), "dashboard lists persisted request");

  await new Promise((resolve) => setTimeout(resolve, 100));
  assert(streamText.includes('"type":"CREATE"'), "SSE emits create event");
  assert(streamText.includes('"type":"UPDATE"'), "SSE emits update event");
  assert(streamText.includes('"type":"MARK_SEEN"'), "SSE emits mark-seen event");
  abort.abort();
  await streamLoop;

  for (const path of ["/", "/room/204", "/staff"]) {
    assert((await fetch(BASE_URL + path)).status === 200, `${path} renders`);
  }

  console.log(`\n${passed} checks passed`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
