/*
  Warnings:

  - You are about to drop the column `customNote` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Request` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Request" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "roomId" TEXT NOT NULL,
    "itemsJson" TEXT NOT NULL DEFAULT '[]',
    "customText" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "seenByStaff" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Request" ("createdAt", "id", "roomId", "status", "updatedAt") SELECT "createdAt", "id", "roomId", "status", "updatedAt" FROM "Request";
DROP TABLE "Request";
ALTER TABLE "new_Request" RENAME TO "Request";
CREATE INDEX "Request_roomId_idx" ON "Request"("roomId");
CREATE INDEX "Request_status_idx" ON "Request"("status");
CREATE INDEX "Request_createdAt_idx" ON "Request"("createdAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
