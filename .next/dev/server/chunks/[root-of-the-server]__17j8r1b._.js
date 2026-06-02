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
"[project]/Downloads/hotel-guest-request-system/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
// Setup global request object to persist data across Next.js dev server hot reloads
const globalForRequests = /*TURBOPACK member replacement*/ __turbopack_context__.g;
if (!globalForRequests.requests) {
    globalForRequests.requests = [
        {
            id: "req-1",
            roomId: "302",
            items: [
                {
                    id: "towels",
                    emoji: "🛁",
                    label: "Fresh Towels",
                    description: "Soft & fluffy, right away"
                }
            ],
            status: "PENDING",
            createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
            seenByStaff: false
        },
        {
            id: "req-2",
            roomId: "105",
            items: [
                {
                    id: "toiletries",
                    emoji: "🪥",
                    label: "Toiletries Kit",
                    description: "Toothbrush, paste & more"
                },
                {
                    id: "soap",
                    emoji: "🧴",
                    label: "Shampoo/Soap",
                    description: "Top up your bathroom"
                }
            ],
            customText: "Please bring 2 extra conditioner bottles as well. Thank you!",
            status: "IN_PROGRESS",
            createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
            seenByStaff: true
        },
        {
            id: "req-3",
            roomId: "217",
            items: [
                {
                    id: "blanket",
                    emoji: "❄️",
                    label: "Extra Blanket",
                    description: "Stay warm tonight"
                }
            ],
            status: "ACKNOWLEDGED",
            createdAt: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 17 * 60 * 1000).toISOString(),
            seenByStaff: true
        },
        {
            id: "req-4",
            roomId: "410",
            items: [
                {
                    id: "pillow",
                    emoji: "🛏",
                    label: "Extra Pillow",
                    description: "For a better night's rest"
                }
            ],
            status: "DONE",
            createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
            updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            seenByStaff: true
        }
    ];
}
if (!globalForRequests.subscribers) {
    globalForRequests.subscribers = [];
}
const db = {
    getRequests () {
        return globalForRequests.requests;
    },
    setRequests (newRequests) {
        globalForRequests.requests = newRequests;
    },
    addRequest (roomId, items, customText) {
        const newRequest = {
            id: "req-" + Date.now(),
            roomId,
            items,
            customText,
            status: "PENDING",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            seenByStaff: false
        };
        globalForRequests.requests.unshift(newRequest);
        this.broadcast("CREATE", newRequest);
        return newRequest;
    },
    updateRequest (id, updates) {
        const idx = globalForRequests.requests.findIndex((r)=>r.id === id);
        if (idx !== -1) {
            const updated = {
                ...globalForRequests.requests[idx],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            globalForRequests.requests[idx] = updated;
            this.broadcast("UPDATE", updated);
            return updated;
        }
        return null;
    },
    markAllSeen () {
        globalForRequests.requests = globalForRequests.requests.map((r)=>({
                ...r,
                seenByStaff: true
            }));
        this.broadcast("MARK_SEEN", null);
    },
    subscribe (callback) {
        globalForRequests.subscribers.push(callback);
        return ()=>{
            globalForRequests.subscribers = globalForRequests.subscribers.filter((cb)=>cb !== callback);
        };
    },
    broadcast (type, data) {
        const payload = JSON.stringify({
            type,
            data
        });
        globalForRequests.subscribers.forEach((cb)=>cb(payload));
    }
};
}),
"[project]/Downloads/hotel-guest-request-system/app/api/requests/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PATCH",
    ()=>PATCH
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/hotel-guest-request-system/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/hotel-guest-request-system/lib/db.ts [app-route] (ecmascript)");
;
;
async function PATCH(req, { params }) {
    try {
        const { id } = await params;
        const { status, seenByStaff } = await req.json();
        const updated = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].updateRequest(id, {
            ...status && {
                status
            },
            ...seenByStaff !== undefined && {
                seenByStaff
            }
        });
        if (!updated) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Request not found"
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(updated);
    } catch (err) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$hotel$2d$guest$2d$request$2d$system$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__17j8r1b._.js.map