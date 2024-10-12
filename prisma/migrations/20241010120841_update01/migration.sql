/*
  Warnings:

  - Made the column `tripEndTime` on table `Trip` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Trip" ALTER COLUMN "tripStartTime" SET DATA TYPE TEXT,
ALTER COLUMN "tripEndTime" SET NOT NULL,
ALTER COLUMN "tripEndTime" SET DATA TYPE TEXT,
ALTER COLUMN "lastPingTime" SET DATA TYPE TEXT,
ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TEXT;
