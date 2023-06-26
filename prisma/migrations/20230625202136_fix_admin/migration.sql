/*
  Warnings:

  - Changed the type of `admin` on the `login` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "login" DROP COLUMN "admin",
ADD COLUMN     "admin" BOOLEAN NOT NULL;
