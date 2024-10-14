import React from 'react';

interface Trip {
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

interface TATStatusCheckerProps {
  trip: Trip;
}

// TATStatusChecker component: Determines whether the trip is delayed or on time
const TATStatusChecker: React.FC<TATStatusCheckerProps> = ({ trip }) => {
  const { etaDays, tripStartTime, tripEndTime, lastPingTime } = trip;

  // If there is no ETA, the status is "Other"
  if (etaDays <= 0) {
    return <span>Other</span>;
  }

  let actualTripTime: number | undefined;

  // If the trip is finished, calculate the total time from start to end
  if (tripEndTime) {
    actualTripTime = new Date(tripEndTime).getTime() - new Date(tripStartTime).getTime();
  } 
  // Otherwise, use the last ping time to calculate the trip time
  else if (lastPingTime) {
    actualTripTime = new Date(lastPingTime).getTime() - new Date(tripStartTime).getTime();
  }

  // If no end or ping time, we can't determine the status
  if (!actualTripTime) {
    return <span>Other</span>;
  }

  // Convert trip duration to days
  const actualTripDays = actualTripTime / (1000 * 60 * 60 * 24);

  // Check if the trip is delayed or on time
  return (
    <span>{etaDays >= actualTripDays ? "On Time" : "Delayed"}</span>
  );
};

export default TATStatusChecker;
