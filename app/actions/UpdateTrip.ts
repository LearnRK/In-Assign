"use server";
import client from "@/prisma/singleton";


export const updateTripToDatabase = async (tripId: string, updatedData: {
    transporter?: string;
    tripStartTime?: string;
}) => {
    try {
        console.log("in updateTripToDatabase");
        await client.trip.update({
            where: {
                tripId: tripId,
            },
            data: {
                transporter: updatedData.transporter || undefined,
                tripStartTime: updatedData.tripStartTime || undefined,
            },
        });
        console.log("Trip updated successfully");
    } catch (error) {
        console.error("Error updating trip in the database:", error);
        throw new Error("Database operation failed");
    }
};
