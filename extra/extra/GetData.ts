import client from "@/extra/db/index";

export interface Trip {
    id: string;
    tripId: string;
    transporter: string;
    tripStartTime: string;
    currentStatusCode: string;
    currenStatus: string;
    phoneNumber: string; // We'll serialize BigInt to string for JSON purposes
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

// Server-side fetching function for trips
export const fetchTripsFromDB = async (): Promise<Trip[]> => {
    const tripData = await client.trip.findMany();

    // Convert the BigInt phoneNumber to string to handle JSON serialization issues
    const sanitizedData: Trip[] = tripData.map(trip => ({
        ...trip,
        phoneNumber: trip.phoneNumber.toString(), // BigInt to string
    }));

    return sanitizedData;
};
