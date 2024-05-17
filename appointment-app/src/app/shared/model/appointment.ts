import { Case } from "./case";

export interface Appointment{
    name : string,
    date : Date;
    case : Case;
}