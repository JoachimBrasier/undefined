/*
  Warnings:

  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResourceDescription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagName` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "ResourceDescription" DROP CONSTRAINT "ResourceDescription_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "TagName" DROP CONSTRAINT "TagName_tagId_fkey";

-- DropForeignKey
ALTER TABLE "_ResourceToTag" DROP CONSTRAINT "_ResourceToTag_B_fkey";

-- DropTable
DROP TABLE "Report";

-- DropTable
DROP TABLE "ResourceDescription";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "TagName";

-- CreateTable
CREATE TABLE "resources_descriptions" (
    "id" SERIAL NOT NULL,
    "resourceId" INTEGER NOT NULL,
    "en" TEXT NOT NULL,
    "fr" TEXT NOT NULL,

    CONSTRAINT "resources_descriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags_names" (
    "id" SERIAL NOT NULL,
    "tagId" INTEGER NOT NULL,
    "en" TEXT NOT NULL,
    "fr" TEXT NOT NULL,

    CONSTRAINT "tags_names_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" SERIAL NOT NULL,
    "type" "ReportType" NOT NULL,
    "description" TEXT NOT NULL,
    "resourceId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "resources_descriptions_resourceId_key" ON "resources_descriptions"("resourceId");

-- CreateIndex
CREATE UNIQUE INDEX "tags_slug_key" ON "tags"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "tags_names_tagId_key" ON "tags_names"("tagId");

-- AddForeignKey
ALTER TABLE "resources_descriptions" ADD CONSTRAINT "resources_descriptions_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags_names" ADD CONSTRAINT "tags_names_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResourceToTag" ADD CONSTRAINT "_ResourceToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
