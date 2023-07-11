/*
  Warnings:

  - Added the required column `unity` to the `login` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "login" ADD COLUMN     "unity" TEXT NOT NULL;
