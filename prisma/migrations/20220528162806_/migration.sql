/*
  Warnings:

  - You are about to drop the `Visit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_userId_fkey";

-- DropTable
DROP TABLE "Visit";

-- CreateTable
CREATE TABLE "UserVisit" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "resourceId" INTEGER NOT NULL,
    "visitedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserVisit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserVisit" ADD CONSTRAINT "UserVisit_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVisit" ADD CONSTRAINT "UserVisit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
