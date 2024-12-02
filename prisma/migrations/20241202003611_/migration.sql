/*
  Warnings:

  - A unique constraint covering the columns `[categoryId,name]` on the table `Dishes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Dishes_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Dishes_categoryId_name_key" ON "Dishes"("categoryId", "name");
