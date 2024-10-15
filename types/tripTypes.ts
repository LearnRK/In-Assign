// types/tripTypes.ts
export interface Trip {
    id: string;
    tripId: string;
    transporter: string;
    tripStartTime: string;
    currentStatusCode: string;
    currenStatus: string;
    phoneNumber: string;
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

export interface TripForm {
    tripId: string;
    transporter: string;
    source: string;
    destination: string;
    phone: string;
}

export interface UpdateTripForm {
    transporter: string;
    time: Date | null;
}
