import {Doctor} from "./Doctor";

export interface Visit {
    id?: number;
    lastName?: string;
    startHour?: number;
    firstName?: string;
    middleName?: string;
    dateOfReceipt?: String;
    doctor?: Doctor;
    doctorId?: number;

    patientId?: number
    isVisited?: boolean;
}
