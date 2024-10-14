"use server"

import prisma from "@/lib/prisma"; // Adjust the path as necessary

export const addTripToDatabase = async (tripData: {
    tripId: string;
    transporter: string;
    source: string;
    dest: string;
    phoneNumber: string;
}) => {
    try {
        console.log("in addTripToDatabase");
        await prisma.trip.create({
            data: {
                tripId: tripData.tripId,
                transporter: tripData.transporter,
                tripStartTime: new Date().toISOString(),
                currentStatusCode: "NEW",
                currenStatus: "New",
                phoneNumber: BigInt(tripData.phoneNumber.replace(/\D/g, '')), // Sanitize and convert phone to BigInt
                etaDays: 0,
                distanceRemaining: 0,
                tripEndTime: "N/A", // Default value for tripEndTime
                source: tripData.source,
                sourceLatitude: 0,
                sourceLongitude: 0,
                dest: tripData.dest,
                destLatitude: 0,
                destLongitude: 0,
                lastPingTime: "N/A", // Default value for lastPingTime
                createdAt: new Date().toISOString() || "N/A", // Default to current time or fallback value
            },
        });
    } catch (error) {
        console.error("Error adding trip to the database:", error);
        throw new Error("Database operation failed");
    }
};
