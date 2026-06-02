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
"[project]/Downloads/hotel-guest-request-system/lib/requestDto.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseItems",
    ()=>parseItems,
    "serializeRequest",
    ()=>serializeRequest
]);
function parseItems(itemsJson) {
    try {
        const parsed = JSON.parse(itemsJson);
        return Array.isArray(parsed) ? parsed : [];
    } catch  {
        return [];
    }
}
function serializeRequest(request) {
    return {
        id: request.id,
        roomId: request.roomId,
        items: parseItems(request.itemsJson),
        customText: request.customText || undefined,
        status: request.status,
        seenByStaff: request.seenByStaff,
        createdAt: request.createdAt.toISOString(),
        updatedAt: request.updatedAt.toISOString()
    };
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
    "soap",
    "blanket",
    "custom-entry"
];
const VALID_STATUSES = [
    "PENDING",
    "ACKNOWLEDGED",
    "IN_PROGRESS",
    "DONE"
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
    const { roomId, items, customText } = body;
    if (!roomId || typeof roomId !== "string") {
        errors.push("roomId is required and must be a string");
    } else if (!/^[a-zA-Z0-9-]{1,20}$/.test(roomId)) {
        errors.push("roomId must be alphanumeric with hyphens, max 20 characters");
    }
    if (!Array.isArray(items) || items.length === 0) {
        errors.push("items must contain at least one request item");
    } else if (items.length > VALID_REQUEST_TYPES.length) {
        errors.push(`items must contain at most ${VALID_REQUEST_TYPES.length} entries`);
    }
    const validatedItems = [];
    if (Array.isArray(items)) {
        const seenIds = new Set();
        for (const item of items){
            if (!item || typeof item !== "object") {
                errors.push("each item must be an object");
                continue;
            }
            const candidate = item;
            if (typeof candidate.id !== "string" || !VALID_REQUEST_TYPES.includes(candidate.id)) {
                errors.push(`item id must be one of: ${VALID_REQUEST_TYPES.join(", ")}`);
                continue;
            }
            if (seenIds.has(candidate.id)) {
                errors.push(`item '${candidate.id}' may only be submitted once`);
                continue;
            }
            if (typeof candidate.label !== "string" || typeof candidate.emoji !== "string" || typeof candidate.description !== "string") {
                errors.push("each item must include string id, emoji, label, and description fields");
                continue;
            }
            seenIds.add(candidate.id);
            validatedItems.push({
                id: candidate.id,
                emoji: candidate.emoji,
                label: candidate.label.trim().slice(0, 80),
                description: candidate.description.trim().slice(0, 200)
            });
        }
    }
    let sanitizedText;
    if (customText !== undefined && customText !== null) {
        if (typeof customText !== "string") {
            errors.push("customText must be a string");
        } else {
            sanitizedText = customText.trim();
            if (sanitizedText.length > 200) {
                errors.push("customText must be at most 200 characters");
            }
        }
    }
    if (errors.length > 0) return {
        valid: false,
        errors
    };
    return {
        valid: true,
        errors: [],
        data: {
            roomId: roomId.toUpperCase(),
            items: validatedItems,
            customText: sanitizedText || undefined
        }
    };
}
function validateStatusTransition(fromStatus, toStatus) {
    const validTransitions = {
        PENDING: [
            "ACKNOWLEDGED"
        ],
        ACKNOWLEDGED: [
            "IN_PROGRESS"
        ],
        IN_PROGRESS: [
            "DONE"
        ]
    };
    if (fromStatus === toStatus) {
        return {
            valid: false,
            error: "Status must be different from current"
        };
    }
    const allowedTransitions = validTransitions[fromStatus];
    if (!allowedTransitions?.includes(toStatus)) {
        return {
            valid: false,
            error: `Cannot transition from '${fromStatus}' to '${toStatus}'`
        };
    }
    return {
        valid: true
    };
}
function isValidCUID(id) {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$requestDto$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/hotel-guest-request-system/lib/requestDto.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/hotel-guest-request-system/lib/validators.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$sse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/hotel-guest-request-system/lib/sse.ts [app-route] (ecmascript)");
;
;
;
;
;
async function GET(_request, { params }) {
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
        const record = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].request.findUnique({
            where: {
                id
            }
        });
        if (!record) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "not_found",
                message: "Request not found"
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$requestDto$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializeRequest"])(record));
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
        let body;
        try {
            body = await request.json();
        } catch  {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "validation_error",
                message: "Request body must be valid JSON"
            }, {
                status: 400
            });
        }
        const status = body.status;
        const seenByStaff = body.seenByStaff;
        if (status === undefined && seenByStaff !== true) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "validation_error",
                message: "Provide status or seenByStaff: true"
            }, {
                status: 400
            });
        }
        if (status !== undefined && (typeof status !== "string" || !__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["VALID_STATUSES"].includes(status))) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "validation_error",
                message: `status must be one of: ${__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["VALID_STATUSES"].join(", ")}`
            }, {
                status: 400
            });
        }
        const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].request.findUnique({
            where: {
                id
            }
        });
        if (!existing) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "not_found",
                message: "Request not found"
            }, {
                status: 404
            });
        }
        if (typeof status === "string") {
            const transition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateStatusTransition"])(existing.status, status);
            if (!transition.valid) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "invalid_transition",
                    message: transition.error,
                    details: {
                        from: existing.status,
                        to: status
                    }
                }, {
                    status: 409
                });
            }
        }
        const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].request.update({
            where: {
                id
            },
            data: {
                status: typeof status === "string" ? status : undefined,
                seenByStaff: seenByStaff === true ? true : undefined
            }
        });
        const dto = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$requestDto$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serializeRequest"])(updated);
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$sse$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["broadcaster"].broadcast("UPDATE", dto);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(dto);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__1puvjqp._.js.map