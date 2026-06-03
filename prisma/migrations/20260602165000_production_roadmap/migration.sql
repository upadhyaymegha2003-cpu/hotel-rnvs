PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

CREATE TABLE "RequestItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "requestId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "RequestItem_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "RequestItem" ("id", "requestId", "type", "emoji", "label", "description")
SELECT lower(hex(randomblob(16))), "Request"."id",
       json_extract(item.value, '$.id'),
       json_extract(item.value, '$.emoji'),
       json_extract(item.value, '$.label'),
       json_extract(item.value, '$.description')
FROM "Request", json_each("Request"."itemsJson") AS item;

CREATE TABLE "new_Request" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "roomId" TEXT NOT NULL,
    "customText" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "seenByStaff" BOOLEAN NOT NULL DEFAULT false,
    "assignedTo" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Request" ("createdAt", "customText", "id", "roomId", "seenByStaff", "status", "updatedAt")
SELECT "createdAt", "customText", "id", "roomId", "seenByStaff", "status", "updatedAt" FROM "Request";
DROP TABLE "Request";
ALTER TABLE "new_Request" RENAME TO "Request";

CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "requestId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "actor" TEXT NOT NULL,
    "metadata" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditLog_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "AuditLog" ("id", "requestId", "action", "actor")
SELECT lower(hex(randomblob(16))), "id", 'MIGRATED', 'system:migration' FROM "Request";

CREATE INDEX "Request_roomId_idx" ON "Request"("roomId");
CREATE INDEX "Request_status_idx" ON "Request"("status");
CREATE INDEX "Request_createdAt_idx" ON "Request"("createdAt");
CREATE INDEX "RequestItem_type_idx" ON "RequestItem"("type");
CREATE UNIQUE INDEX "RequestItem_requestId_type_key" ON "RequestItem"("requestId", "type");
CREATE INDEX "AuditLog_requestId_createdAt_idx" ON "AuditLog"("requestId", "createdAt");

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
