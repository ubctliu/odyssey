/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Trip` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "url" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Trip_url_key" ON "Trip"("url");
