"use server";
import client from "@/prisma/singleton";

export const deleteTripsFromDatabase = async (tripIds: string[]) => {
    try {
        console.log("In deleteTripsFromDatabase");

        // Using Prisma to delete multiple trips at once with the `deleteMany` method
        await client.trip.deleteMany({
            where: {
                tripId: {
                    in: tripIds, // This will delete all trips whose `tripId` is in the array
                },
            },
        });

        console.log(`Successfully deleted ${tripIds.length} trips`);
    } catch (error) {
        console.error("Error deleting trips from the database:", error);
        throw new Error("Failed to delete trips");
    }
};
