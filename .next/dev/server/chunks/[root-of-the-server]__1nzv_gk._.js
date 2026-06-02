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
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Downloads/hotel-guest-request-system/app/api/requests/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/hotel-guest-request-system/node_modules/next/server.js [app-route] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/lib/prisma'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/lib/rateLimit'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/lib/validators'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/lib/sse'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
;
;
;
async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const roomId = searchParams.get("roomId");
        const status = searchParams.get("status");
        const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 100);
        const cursor = searchParams.get("cursor");
        // Build where clause
        const where = {};
        if (roomId) where.roomId = roomId;
        if (status) where.status = status;
        // Cursor-based pagination
        const skip = cursor ? 1 : 0;
        const cursorObj = cursor ? {
            id: cursor
        } : undefined;
        const [requests, total] = await Promise.all([
            prisma.request.findMany({
                where,
                orderBy: {
                    createdAt: "desc"
                },
                take: limit + 1,
                skip,
                cursor: cursorObj
            }),
            prisma.request.count({
                where
            })
        ]);
        // Determine if there are more results and extract next cursor
        const hasMore = requests.length > limit;
        const displayRequests = requests.slice(0, limit);
        const nextCursor = hasMore && displayRequests.length > 0 ? displayRequests[displayRequests.length - 1].id : undefined;
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            requests: displayRequests,
            total,
            hasMore,
            nextCursor
        }, {
            status: 200
        });
    } catch (error) {
        console.error("[GET /api/requests]", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "server_error",
            message: "Internal server error"
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        const validation = validateRequestBody(body);
        if (!validation.valid) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "validation_error",
                message: "Invalid request body",
                details: {
                    errors: validation.errors
                }
            }, {
                status: 400
            });
        }
        const { roomId, type, customNote } = validation.data;
        // Check rate limit
        const rateLimitCheck = rateLimiter.checkRateLimit(roomId);
        if (!rateLimitCheck.allowed) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "rate_limited",
                message: "Too many requests from this room",
                details: {
                    retryAfter: rateLimitCheck.retryAfter
                }
            }, {
                status: 429,
                headers: {
                    "Retry-After": String(rateLimitCheck.retryAfter)
                }
            });
        }
        // Check for duplicate active request
        const existingRequest = await prisma.request.findFirst({
            where: {
                roomId,
                type,
                status: {
                    not: "done"
                }
            }
        });
        if (existingRequest) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "duplicate",
                message: "A request of this type is already active for this room",
                details: {
                    existingId: existingRequest.id,
                    status: existingRequest.status
                }
            }, {
                status: 409
            });
        }
        // Create request
        const newRequest = await prisma.request.create({
            data: {
                roomId,
                type,
                customNote: customNote || null,
                status: "pending"
            }
        });
        // Broadcast SSE event
        broadcaster.broadcast("request:new", {
            id: newRequest.id,
            roomId: newRequest.roomId,
            type: newRequest.type,
            customNote: newRequest.customNote,
            status: newRequest.status,
            createdAt: newRequest.createdAt.toISOString(),
            updatedAt: newRequest.updatedAt.toISOString()
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            id: newRequest.id,
            roomId: newRequest.roomId,
            type: newRequest.type,
            customNote: newRequest.customNote,
            status: newRequest.status,
            createdAt: newRequest.createdAt.toISOString(),
            updatedAt: newRequest.updatedAt.toISOString()
        }, {
            status: 201
        });
    } catch (error) {
        console.error("[POST /api/requests]", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "server_error",
            message: "Internal server error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1nzv_gk._.js.map