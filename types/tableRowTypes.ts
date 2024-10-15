// types/tableRowTypes.ts
import { Trip } from "./tripTypes";

export interface TableRowComponentProps {
    trip: Trip;
    selectedRows: string[];
    onRowSelect: (tripId: string) => void;
    TAT: (trip: Trip) => string;
}
