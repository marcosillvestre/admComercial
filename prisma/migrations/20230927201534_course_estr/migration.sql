/*
  Warnings:

  - Added the required column `curso` to the `person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "person" ADD COLUMN     "curso" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "conec" (
    "id" SERIAL NOT NULL,
    "access_token" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,

    CONSTRAINT "conec_pkey" PRIMARY KEY ("id")
);
