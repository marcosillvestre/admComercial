/*
  Warnings:

  - Changed the type of `dataAC` on the `person` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "person" DROP COLUMN "dataAC",
ADD COLUMN     "dataAC" JSONB NOT NULL;
