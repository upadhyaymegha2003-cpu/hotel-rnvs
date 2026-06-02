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
"[project]/Downloads/hotel-guest-request-system/app/api/requests/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/hotel-guest-request-system/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/hotel-guest-request-system/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/hotel-guest-request-system/lib/validators.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$sse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/hotel-guest-request-system/lib/sse.ts [app-route] (ecmascript)");
;
;
;
;
async function GET(request, { params }) {
    try {
        const { id } = await params;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isValidCUID"])(id)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "invalid_id",
                message: "Invalid request ID format"
            }, {
                status: 400
            });
        }
        const requestRecord = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].request.findUnique({
            where: {
                id
            }
        });
        if (!requestRecord) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "not_found",
                message: "Request not found"
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            id: requestRecord.id,
            roomId: requestRecord.roomId,
            type: requestRecord.type,
            customNote: requestRecord.customNote,
            status: requestRecord.status,
            createdAt: requestRecord.createdAt.toISOString(),
            updatedAt: requestRecord.updatedAt.toISOString()
        }, {
            status: 200
        });
    } catch (error) {
        console.error("[GET /api/requests/[id]]", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "server_error",
            message: "Internal server error"
        }, {
            status: 500
        });
    }
}
async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isValidCUID"])(id)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "invalid_id",
                message: "Invalid request ID format"
            }, {
                status: 400
            });
        }
        const body = await request.json();
        if (!body || typeof body !== "object") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "validation_error",
                message: "Request body must be a valid JSON object"
            }, {
                status: 400
            });
        }
        const { status: newStatus } = body;
        if (!newStatus || typeof newStatus !== "string") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "validation_error",
                message: "status is required and must be a string"
            }, {
                status: 400
            });
        }
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["VALID_STATUSES"].includes(newStatus)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "validation_error",
                message: `status must be one of: ${__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["VALID_STATUSES"].join(", ")}`
            }, {
                status: 400
            });
        }
        // Fetch existing request
        const existingRequest = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].request.findUnique({
            where: {
                id
            }
        });
        if (!existingRequest) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "not_found",
                message: "Request not found"
            }, {
                status: 404
            });
        }
        // Validate status transition
        const transitionValidation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateStatusTransition"])(existingRequest.status, newStatus);
        if (!transitionValidation.valid) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "invalid_transition",
                message: transitionValidation.error,
                details: {
                    from: existingRequest.status,
                    to: newStatus
                }
            }, {
                status: 409
            });
        }
        // Update status
        const updatedRequest = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].request.update({
            where: {
                id
            },
            data: {
                status: newStatus
            }
        });
        // Broadcast SSE event
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$sse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["broadcaster"].broadcast("request:update", {
            id: updatedRequest.id,
            roomId: updatedRequest.roomId,
            type: updatedRequest.type,
            customNote: updatedRequest.customNote,
            status: updatedRequest.status,
            createdAt: updatedRequest.createdAt.toISOString(),
            updatedAt: updatedRequest.updatedAt.toISOString()
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            id: updatedRequest.id,
            roomId: updatedRequest.roomId,
            type: updatedRequest.type,
            customNote: updatedRequest.customNote,
            status: updatedRequest.status,
            createdAt: updatedRequest.createdAt.toISOString(),
            updatedAt: updatedRequest.updatedAt.toISOString()
        }, {
            status: 200
        });
    } catch (error) {
        console.error("[PATCH /api/requests/[id]]", error);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__1bxztju._.js.map