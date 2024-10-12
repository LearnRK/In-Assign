-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "transporter" TEXT NOT NULL,
    "tripStartTime" TIMESTAMP(3) NOT NULL,
    "currentStatusCode" TEXT NOT NULL,
    "currenStatus" TEXT NOT NULL,
    "phoneNumber" BIGINT NOT NULL,
    "etaDays" INTEGER NOT NULL,
    "distanceRemaining" INTEGER NOT NULL,
    "tripEndTime" TIMESTAMP(3),
    "source" TEXT NOT NULL,
    "sourceLatitude" DOUBLE PRECISION NOT NULL,
    "sourceLongitude" DOUBLE PRECISION NOT NULL,
    "dest" TEXT NOT NULL,
    "destLatitude" DOUBLE PRECISION NOT NULL,
    "destLongitude" DOUBLE PRECISION NOT NULL,
    "lastPingTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);
