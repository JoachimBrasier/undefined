-- CreateTable
CREATE TABLE "_userVisits" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_userVisits_AB_unique" ON "_userVisits"("A", "B");

-- CreateIndex
CREATE INDEX "_userVisits_B_index" ON "_userVisits"("B");

-- AddForeignKey
ALTER TABLE "_userVisits" ADD CONSTRAINT "_userVisits_A_fkey" FOREIGN KEY ("A") REFERENCES "resources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_userVisits" ADD CONSTRAINT "_userVisits_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
