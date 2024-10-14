"use server";

import prisma from "@/lib/prisma"; // Adjust the path as necessary

export const updateTripToDatabase = async (tripId: string, updatedData: {
    transporter?: string;
    tripStartTime?: string;
}) => {
    try {
        console.log("in updateTripToDatabase");
        await prisma.trip.update({
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
