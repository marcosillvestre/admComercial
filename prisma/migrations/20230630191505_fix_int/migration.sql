/*
  Warnings:

  - Changed the type of `Valor` on the `person` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "person" DROP COLUMN "Valor",
ADD COLUMN     "Valor" INTEGER NOT NULL;
