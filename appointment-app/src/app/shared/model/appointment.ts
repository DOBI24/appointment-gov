import { Timestamp } from "@angular/fire/firestore";

export interface Appointment{
    id?: string;
    name : string,
    case : string;
    date : Timestamp;
}