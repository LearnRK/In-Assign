// app/api/createTrip/route.ts
import { NextResponse } from 'next/server';
import client from '@/extra/db/index';

export async function POST(req: Request) {
    try {
        const body = await req.json(); // Parse request body to get trip data
        const { tripId, transporter, source, destination, phone } = body;

        if (!tripId || !transporter || !source || !destination || !phone) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Create a new trip using Prisma
        const newTrip = await client.trip.create({
            data: {
                tripId: tripId,
                transporter: transporter,
                source: source,
                dest: destination,
                phoneNumber: BigInt(phone),
                tripStartTime: new Date().toISOString(),
                currentStatusCode: 'NEW',
                currenStatus: 'New',
                etaDays: 5,
                distanceRemaining: 100,
                tripEndTime: '',
                sourceLatitude: 0.0,
                sourceLongitude: 0.0,
                destLatitude: 0.0,
                destLongitude: 0.0,
                lastPingTime: '',
                createdAt: new Date().toISOString(),
            },
        });

        // Respond with the newly created trip data
        return NextResponse.json(newTrip, { status: 201 });
    } catch (error) {
        console.error('Error creating trip:', error);
        return NextResponse.json(
            { message: 'Error creating trip' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const trips = await client.trip.findMany();
        return NextResponse.json(trips, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching trips' }, { status: 500 });
    }
}
