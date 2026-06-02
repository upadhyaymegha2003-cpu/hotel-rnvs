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
"[project]/Downloads/hotel-guest-request-system/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/Downloads/hotel-guest-request-system/node_modules/@prisma/client)");
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma || new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
    log: [
        "error"
    ]
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/Downloads/hotel-guest-request-system/lib/rateLimit.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RateLimiter",
    ()=>RateLimiter,
    "rateLimiter",
    ()=>rateLimiter
]);
class RateLimiter {
    storage = new Map();
    limit;
    windowMs;
    constructor(limit = 5, windowMs = 10 * 60 * 1000){
        this.limit = limit;
        this.windowMs = windowMs;
    }
    checkRateLimit(key) {
        const now = Date.now();
        const entry = this.storage.get(key);
        // Entry doesn't exist or window has expired
        if (!entry || now >= entry.resetAt) {
            this.storage.set(key, {
                count: 1,
                resetAt: now + this.windowMs
            });
            return {
                allowed: true
            };
        }
        // Within window: increment counter
        entry.count++;
        if (entry.count > this.limit) {
            const retryAfterMs = entry.resetAt - now;
            const retryAfterSeconds = Math.ceil(retryAfterMs / 1000);
            return {
                allowed: false,
                retryAfter: retryAfterSeconds
            };
        }
        return {
            allowed: true
        };
    }
    reset(key) {
        this.storage.delete(key);
    }
    // Cleanup expired entries
    cleanup() {
        const now = Date.now();
        const keysToDelete = [];
        for (const [key, entry] of this.storage.entries()){
            if (now >= entry.resetAt) {
                keysToDelete.push(key);
            }
        }
        for (const key of keysToDelete){
            this.storage.delete(key);
        }
    }
}
const rateLimiter = new RateLimiter(5, 10 * 60 * 1000);
// Optional: cleanup every minute
if ("TURBOPACK compile-time truthy", 1) {
    setInterval(()=>{
        rateLimiter.cleanup();
    }, 60 * 1000);
}
}),
"[project]/Downloads/hotel-guest-request-system/lib/validators.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VALID_REQUEST_TYPES",
    ()=>VALID_REQUEST_TYPES,
    "VALID_STATUSES",
    ()=>VALID_STATUSES,
    "isValidCUID",
    ()=>isValidCUID,
    "validateRequestBody",
    ()=>validateRequestBody,
    "validateStatusTransition",
    ()=>validateStatusTransition
]);
const VALID_REQUEST_TYPES = [
    "towels",
    "toiletries",
    "pillow",
    "blanket",
    "shampoo",
    "custom"
];
const VALID_STATUSES = [
    "pending",
    "acknowledged",
    "in_progress",
    "done"
];
function validateRequestBody(body) {
    const errors = [];
    if (!body || typeof body !== "object") {
        return {
            valid: false,
            errors: [
                "Request body must be a valid JSON object"
            ]
        };
    }
    const { roomId, type, customNote } = body;
    // Validate roomId
    if (!roomId || typeof roomId !== "string") {
        errors.push("roomId is required and must be a string");
    } else if (!/^[a-zA-Z0-9\-]{1,20}$/.test(roomId)) {
        errors.push("roomId must be alphanumeric with hyphens, max 20 characters");
    }
    // Validate type
    if (!type || typeof type !== "string") {
        errors.push("type is required and must be a string");
    } else if (!VALID_REQUEST_TYPES.includes(type)) {
        errors.push(`type must be one of: ${VALID_REQUEST_TYPES.join(", ")}`);
    }
    // Validate customNote (optional)
    let sanitizedNote;
    if (customNote !== undefined && customNote !== null) {
        if (typeof customNote !== "string") {
            errors.push("customNote must be a string");
        } else {
            sanitizedNote = customNote.trim();
            if (sanitizedNote.length > 200) {
                errors.push("customNote must be at most 200 characters");
            }
        }
    }
    if (errors.length > 0) {
        return {
            valid: false,
            errors
        };
    }
    return {
        valid: true,
        errors: [],
        data: {
            roomId: roomId.toUpperCase(),
            type: type,
            customNote: sanitizedNote || undefined
        }
    };
}
function validateStatusTransition(fromStatus, toStatus) {
    const validTransitions = {
        pending: [
            "acknowledged"
        ],
        acknowledged: [
            "in_progress"
        ],
        in_progress: [
            "done"
        ]
    };
    if (fromStatus === toStatus) {
        return {
            valid: false,
            error: "Status must be different from current"
        };
    }
    const allowedTransitions = validTransitions[fromStatus];
    if (!allowedTransitions) {
        return {
            valid: false,
            error: `No transitions allowed from status '${fromStatus}'`
        };
    }
    if (!allowedTransitions.includes(toStatus)) {
        return {
            valid: false,
            error: `Cannot transition from '${fromStatus}' to '${toStatus}'. Allowed: ${allowedTransitions.join(", ")}`
        };
    }
    return {
        valid: true
    };
}
function isValidCUID(id) {
    // CUID format: starts with 'c' followed by 24 lowercase alphanumeric chars
    return /^c[0-9a-z]{24}$/.test(id);
}
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
    broadcast(event, data) {
        const payload = {
            event,
            data
        };
        const messageId = ++this.messageId;
        const message = `id: ${messageId}\nevent: ${event}\ndata: ${JSON.stringify(payload.data)}\n\n`;
        const encoded = new TextEncoder().encode(message);
        // Send to all connected clients, remove disconnected ones
        const deadClients = new Set();
        for (const client of this.clients){
            try {
                client.enqueue(encoded);
            } catch (error) {
                // Client disconnected, mark for removal
                deadClients.add(client);
            }
        }
        // Clean up disconnected clients
        for (const client of deadClients){
            this.clients.delete(client);
        }
    }
    sendKeepAlive(controller) {
        try {
            const keepAlive = new TextEncoder().encode(": keepalive\n\n");
            controller.enqueue(keepAlive);
        } catch (error) {
            this.clients.delete(controller);
        }
    }
    getClientCount() {
        return this.clients.size;
    }
}
const broadcaster = new SSEBroadcaster();
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/hotel-guest-request-system/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$rateLimit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/hotel-guest-request-system/lib/rateLimit.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/hotel-guest-request-system/lib/validators.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$sse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/hotel-guest-request-system/lib/sse.ts [app-route] (ecmascript)");
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
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].request.findMany({
                where,
                orderBy: {
                    createdAt: "desc"
                },
                take: limit + 1,
                skip,
                cursor: cursorObj
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].request.count({
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
        const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateRequestBody"])(body);
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
        const rateLimitCheck = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$rateLimit$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["rateLimiter"].checkRateLimit(roomId);
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
        const existingRequest = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].request.findFirst({
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
        const newRequest = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].request.create({
            data: {
                roomId,
                type,
                customNote: customNote || null,
                status: "pending"
            }
        });
        // Broadcast SSE event
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$sse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["broadcaster"].broadcast("request:new", {
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

//# sourceMappingURL=%5Broot-of-the-server%5D__0e14brk._.js.map