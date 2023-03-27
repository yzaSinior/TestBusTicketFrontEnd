import {Client} from "./Client";
import {Bus} from "./Bus";

export interface Reservation {
    id: number;
    client: Client;
    travelDate: any;
    buses: Bus[];
    totalCost: number;
    discountApplied: boolean;
    billGenerated: boolean;
}