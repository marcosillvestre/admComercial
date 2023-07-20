/*
  Warnings:

  - The `dataAC` column on the `person` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `alunoNascimento` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cargaHoraria` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contratoStatus` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataComissionamento` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataMatricula` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataValidacao` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formatoAula` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horarioFim` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horarioInicio` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idadeAluno` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mdData` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mdDesconto` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mdFormaPg` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mdParcelas` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mdVencimento` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nivelamento` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `observacao` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ppData` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ppDesconto` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ppFormaPg` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ppParcelas` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ppValor` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tempoContrato` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoModalidade` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tmData` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tmDesconto` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tmFormaPg` to the `person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tmParcelas` to the `person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "person" ADD COLUMN     "alunoNascimento" TEXT NOT NULL,
ADD COLUMN     "cargaHoraria" TEXT NOT NULL,
ADD COLUMN     "contratoStatus" TEXT NOT NULL,
ADD COLUMN     "dataComissionamento" TEXT NOT NULL,
ADD COLUMN     "dataMatricula" TEXT NOT NULL,
ADD COLUMN     "dataValidacao" TEXT NOT NULL,
ADD COLUMN     "diaAula" TEXT[],
ADD COLUMN     "formatoAula" TEXT NOT NULL,
ADD COLUMN     "horarioFim" TEXT NOT NULL,
ADD COLUMN     "horarioInicio" TEXT NOT NULL,
ADD COLUMN     "idadeAluno" TEXT NOT NULL,
ADD COLUMN     "materialDidatico" TEXT[],
ADD COLUMN     "mdData" TEXT NOT NULL,
ADD COLUMN     "mdDesconto" TEXT NOT NULL,
ADD COLUMN     "mdFormaPg" TEXT NOT NULL,
ADD COLUMN     "mdParcelas" TEXT NOT NULL,
ADD COLUMN     "mdVencimento" TEXT NOT NULL,
ADD COLUMN     "nivelamento" TEXT NOT NULL,
ADD COLUMN     "observacao" TEXT NOT NULL,
ADD COLUMN     "ppData" TEXT NOT NULL,
ADD COLUMN     "ppDesconto" TEXT NOT NULL,
ADD COLUMN     "ppFormaPg" TEXT NOT NULL,
ADD COLUMN     "ppParcelas" TEXT NOT NULL,
ADD COLUMN     "ppValor" TEXT NOT NULL,
ADD COLUMN     "professor" TEXT[],
ADD COLUMN     "tempoContrato" TEXT NOT NULL,
ADD COLUMN     "tipoModalidade" TEXT NOT NULL,
ADD COLUMN     "tmData" TEXT NOT NULL,
ADD COLUMN     "tmDesconto" TEXT NOT NULL,
ADD COLUMN     "tmFormaPg" TEXT NOT NULL,
ADD COLUMN     "tmParcelas" TEXT NOT NULL,
DROP COLUMN "dataAC",
ADD COLUMN     "dataAC" TEXT[],
ALTER COLUMN "acStatus" SET NOT NULL,
ALTER COLUMN "acStatus" SET DATA TYPE TEXT;
