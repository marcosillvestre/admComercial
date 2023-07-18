/*
  Warnings:

  - The `acStatus` column on the `person` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "person" DROP COLUMN "acStatus",
ADD COLUMN     "acStatus" TEXT[];
