/*
  Warnings:

  - The `professor` column on the `person` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `comissaoStatus` to the `person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "person" ADD COLUMN     "comissaoStatus" TEXT NOT NULL,
DROP COLUMN "professor",
ADD COLUMN     "professor" TEXT[];
