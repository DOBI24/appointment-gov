import { Timestamp } from "@angular/fire/firestore";
import { Case } from "./case";

export interface Appointment{
    id: string;
    name : string,
    case : Case;
    date : Timestamp;
}