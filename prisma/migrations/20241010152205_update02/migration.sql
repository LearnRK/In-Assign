/*
  Warnings:

  - You are about to alter the column `phoneNumber` on the `Trip` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Trip" ALTER COLUMN "phoneNumber" SET DATA TYPE INTEGER;
