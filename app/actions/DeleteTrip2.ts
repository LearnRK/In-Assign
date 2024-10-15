"use server";
import client from "@/prisma/singleton";

export const deleteTripsFromDatabase = async (tripIds: string[]) => {
    try {
        console.log("In deleteTripsFromDatabase");

        await client.trip.deleteMany({
            where: {
                tripId: {
                    in: tripIds,
                },
            },
        });

        console.log(`Successfully deleted ${tripIds.length} trips`);
    } catch (error) {
        console.error("Error deleting trips from the database:", error);
        throw new Error("Failed to delete trips");
    }
};
