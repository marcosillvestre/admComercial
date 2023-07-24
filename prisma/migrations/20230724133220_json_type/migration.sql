/*
  Warnings:

  - Added the required column `cpfPerson` to the `person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "person" ADD COLUMN     "cpfPerson" TEXT NOT NULL,
ALTER COLUMN "dataAC" DROP NOT NULL;
