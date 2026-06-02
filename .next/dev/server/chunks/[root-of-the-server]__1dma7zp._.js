module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Downloads/hotel-guest-request-system/lib/sse.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SSEBroadcaster",
    ()=>SSEBroadcaster,
    "broadcaster",
    ()=>broadcaster
]);
class SSEBroadcaster {
    clients = new Set();
    messageId = 0;
    subscribe(controller) {
        this.clients.add(controller);
    }
    unsubscribe(controller) {
        this.clients.delete(controller);
    }
    broadcast(type, data) {
        const payload = JSON.stringify({
            type,
            data
        });
        const message = `id: ${++this.messageId}\ndata: ${payload}\n\n`;
        const encoded = new TextEncoder().encode(message);
        for (const client of this.clients){
            try {
                client.enqueue(encoded);
            } catch  {
                this.clients.delete(client);
            }
        }
    }
    getClientCount() {
        return this.clients.size;
    }
}
const broadcaster = new SSEBroadcaster();
}),
"[project]/Downloads/hotel-guest-request-system/app/api/requests/stream/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$sse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/hotel-guest-request-system/lib/sse.ts [app-route] (ecmascript)");
;
const dynamic = "force-dynamic";
function GET() {
    let controller;
    let keepalive;
    const stream = new ReadableStream({
        start (streamController) {
            controller = streamController;
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$sse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["broadcaster"].subscribe(controller);
            controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({
                type: "CONNECTED"
            })}\n\n`));
            keepalive = setInterval(()=>{
                try {
                    controller.enqueue(new TextEncoder().encode(": keepalive\n\n"));
                } catch  {
                    clearInterval(keepalive);
                    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$sse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["broadcaster"].unsubscribe(controller);
                }
            }, 30000);
        },
        cancel () {
            clearInterval(keepalive);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$sse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["broadcaster"].unsubscribe(controller);
        }
    });
    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            Connection: "keep-alive",
            "X-Accel-Buffering": "no"
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1dma7zp._.js.map