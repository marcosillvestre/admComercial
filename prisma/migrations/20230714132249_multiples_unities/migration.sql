/*
  Warnings:

  - The `unity` column on the `login` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "login" DROP COLUMN "unity",
ADD COLUMN     "unity" TEXT[];
