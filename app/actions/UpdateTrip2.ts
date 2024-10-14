"use server";
import prisma from "@/lib/23/prisma";

export const updateTripToDatabase = async (tripId: string, updatedData: {
    transporter?: string;
    tripStartTime?: string;
    etaDays?: number;
    currenStatus?: string,
    distanceRemaining: number,


}) => {
    try {
        let currentStatusCode;
        if (updatedData.currenStatus == "Booked") currentStatusCode = "BKD";
        if (updatedData.currenStatus == "Delivered") currentStatusCode = "DEL";
        if (updatedData.currenStatus == "Reached Destination") currentStatusCode = "RD";
        console.log("in updateTripToDatabase");
        await prisma.trip.update({
            where: {
                tripId: tripId,
            },
            data: {
                transporter: updatedData.transporter || undefined,
                tripStartTime: updatedData.tripStartTime || undefined,
                etaDays: updatedData.etaDays,
                currenStatus: updatedData.currenStatus,
                currentStatusCode: currentStatusCode,
                distanceRemaining: updatedData.distanceRemaining,
                tripEndTime: "N/A",




            },
        });
        console.log("Trip updated successfully");
    } catch (error) {
        console.error("Error updating trip in the database:", error);
        throw new Error("Database operation failed");
    }
};
