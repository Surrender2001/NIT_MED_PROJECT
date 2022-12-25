import {Doctor} from "./Doctor";

export interface Visit {
  id: number;
  lastName?: string;
  startHour?: number;
  firstName?: string;
  middleName?: string;
  dateOfReceipt?: Date;
  doctor?: Doctor;
  doctorId?: number;
  isVisited?: boolean;
}
