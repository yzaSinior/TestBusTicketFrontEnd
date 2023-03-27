import {Reservation} from "./Reservation";
import {Client} from "./Client";

export interface Bill {
    id: number;
    reservation: Reservation;
    paymentMethod: any;
    client: Client;
    paymentDate: any;
}
