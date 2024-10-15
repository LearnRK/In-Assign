"use server";

import client from "@/prisma/singleton";

export interface Trip {
    id: string;
    tripId: string;
    transporter: string;
    tripStartTime: string;
    currentStatusCode: string;
    currenStatus: string;
    phoneNumber: string;
    etaDays: number;
    distanceRemaining: number;
    tripEndTime: string;
    source: string;
    sourceLatitude: number;
    sourceLongitude: number;
    dest: string;
    destLatitude: number;
    destLongitude: number;
    lastPingTime: string;
    createdAt: string;
}

export const fetchTripsFromDB = async (): Promise<Trip[]> => {
    try {
        const tripData = await client.trip.findMany();

        const sanitizedData: Trip[] = tripData.map(trip => ({
            ...trip,
            phoneNumber: trip.phoneNumber.toString(),
        }));

        return sanitizedData;
    } catch (error) {
        console.error("Error fetching trips from database:", error);
        throw new Error("Failed to fetch trips from the database");
    }
};
