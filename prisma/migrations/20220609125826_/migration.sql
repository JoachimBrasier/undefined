/*
  Warnings:

  - A unique constraint covering the columns `[userId,resourceId]` on the table `UserVisit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserVisit_userId_resourceId_key" ON "UserVisit"("userId", "resourceId");
