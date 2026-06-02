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
"[project]/Downloads/hotel-guest-request-system/app/api/requests/stream/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic
]);
(()=>{
    const e = new Error("Cannot find module '@/lib/sse'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
const dynamic = "force-dynamic";
function GET() {
    const stream = new ReadableStream({
        start (controller) {
            // Register this client with the broadcaster
            broadcaster.subscribe(controller);
            // Send initial connection confirmation
            const connectedEvent = `id: 0\nevent: connected\ndata: {"timestamp":${Date.now()}}\n\n`;
            controller.enqueue(new TextEncoder().encode(connectedEvent));
            // Setup keepalive interval
            const keepaliveInterval = setInterval(()=>{
                try {
                    const keepAlive = new TextEncoder().encode(": keepalive\n\n");
                    controller.enqueue(keepAlive);
                } catch (error) {
                    // Client disconnected
                    clearInterval(keepaliveInterval);
                    broadcaster.unsubscribe(controller);
                    try {
                        controller.close();
                    } catch (e) {
                    // Already closed
                    }
                }
            }, 30000);
            // Handle client disconnect
            const originalClose = controller.close.bind(controller);
            controller.close = function() {
                clearInterval(keepaliveInterval);
                broadcaster.unsubscribe(controller);
                return originalClose();
            };
        },
        cancel () {
            // Client disconnected
            broadcaster.cleanup();
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

//# sourceMappingURL=%5Broot-of-the-server%5D__1d-tjrp._.js.map