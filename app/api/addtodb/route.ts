import { NextRequest, NextResponse } from 'next/server';
import client from "@/prisma/singleton";

interface TripData {
    tripId: string;
    transporter: string;
    tripStartTime: string;
    currentStatusCode: string;
    currenStatus: string;
    phoneNumber: bigint;
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

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const trips: TripData[] = body.data.map((trip: Partial<TripData>) => ({
            tripId: trip.tripId || "",
            transporter: trip.transporter || "",
            tripStartTime: trip.tripStartTime || "",
            currentStatusCode: trip.currentStatusCode || "",
            currenStatus: trip.currenStatus || "",
            phoneNumber: BigInt(trip.phoneNumber || "0"),
            etaDays: trip.etaDays || 0,
            distanceRemaining: trip.distanceRemaining || 0,
            tripEndTime: trip.tripEndTime || "",
            source: trip.source || "",
            sourceLatitude: trip.sourceLatitude || 0,
            sourceLongitude: trip.sourceLongitude || 0,
            dest: trip.dest || "",
            destLatitude: trip.destLatitude || 0,
            destLongitude: trip.destLongitude || 0,
            lastPingTime: trip.lastPingTime || "",
            createdAt: trip.createdAt || ""
        }));

        const createdTrips = await Promise.all(
            trips.map(async (trip) => client.trip.create({ data: trip }))
        );

        // Convert BigInt values to strings for JSON serialization
        const sanitizedTrips = createdTrips.map(trip => ({
            ...trip,
            phoneNumber: trip.phoneNumber.toString() // BigInt to string for response
        }));

        return NextResponse.json({ trips: sanitizedTrips });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: "Error while creating trips" }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: "connected to get" });
}
