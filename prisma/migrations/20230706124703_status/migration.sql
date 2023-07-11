/*
  Warnings:

  - Added the required column `paStatus` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `situMatric` to the `person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "person" ADD COLUMN     "paStatus" TEXT NOT NULL,
ADD COLUMN     "situMatric" TEXT NOT NULL;
