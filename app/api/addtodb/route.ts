import { NextRequest, NextResponse } from 'next/server';
import client from "@/db/index"

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const trips = body.data.map((trip: any) => ({
            tripId: trip.tripId || "",
            transporter: trip.transporter || "",
            tripStartTime: trip.tripStartTime || "",
            currentStatusCode: trip.currentStatusCode || "",
            currenStatus: trip.currenStatus || "",
            phoneNumber: BigInt(trip.phoneNumber), // Use BigInt here, but convert later for response
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

        const createdTrips = await Promise.all(trips.map(async (trip: any) => {
            return client.trip.create({ data: trip });
        }));

        // Convert BigInt values to strings in the response to avoid serialization issues
        const sanitizedTrips = createdTrips.map(trip => ({
            ...trip,
            phoneNumber: trip.phoneNumber.toString() // Convert BigInt to string for the response
        }));

        return NextResponse.json({
            trips: sanitizedTrips
        });
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            message: "Error while creating trips"
        }, {
            status: 500
        });
    }
}

export async function GET(req: NextRequest) {
    return NextResponse.json({
        message: "connected to get"
    });
}
