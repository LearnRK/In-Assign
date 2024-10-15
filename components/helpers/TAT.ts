// src/helpers/TAT.ts

import { Trip } from "@/types/tripTypes";

export const TAT = (trip: Trip): string => {
    const { etaDays, tripStartTime, tripEndTime, lastPingTime } = trip;

    if (etaDays <= 0) {
        return "Other";
    }

    let actualTripTime: number | undefined;

    if (tripEndTime) {
        actualTripTime = new Date(tripEndTime).getTime() - new Date(tripStartTime).getTime();
    } else if (lastPingTime) {
        actualTripTime = new Date(lastPingTime).getTime() - new Date(tripStartTime).getTime();
    } else {
        return "Other";
    }

    const actualTripDays = actualTripTime / (1000 * 60 * 60 * 24);
    return etaDays >= actualTripDays ? "On Time" : "Delayed";
};
