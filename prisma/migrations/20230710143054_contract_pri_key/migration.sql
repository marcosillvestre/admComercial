/*
  Warnings:

  - The primary key for the `person` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "person" DROP CONSTRAINT "person_pkey",
ADD CONSTRAINT "person_pkey" PRIMARY KEY ("contrato");
