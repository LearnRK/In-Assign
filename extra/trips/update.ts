import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Interface for the server-side form submission (ISO string for time)
interface ServerUpdateTripForm {
    transporter: string;
    time: string;
}

export async function updateTripsInDb(formState: ServerUpdateTripForm[], tripIds: string[]) {
    const updatePromises = tripIds.map((tripId, index) =>
        prisma.trip.update({
            where: { tripId }, // Use tripId here since it's unique in your schema
            data: {
                transporter: formState[index].transporter,
                tripStartTime: formState[index].time,
            },
        })
    );

    // Await all update promises
    return Promise.all(updatePromises);
}
