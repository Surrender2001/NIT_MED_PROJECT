import {RestApiService} from './RestApiService';
import {AxiosResponse} from 'axios';
import {Patient} from "../dto/Patient";
import {Visit} from "../dto/Visit";

export class VisitService extends RestApiService {

    static getVisits(patientId?: number, doctorId?: number, dateOfReceipt?: string): Promise<AxiosResponse<Patient[]>> {
        const request = {
            params: {
                patientId: patientId,
                doctorId: doctorId,
                dateOfReceipt: dateOfReceipt,
            }
        }
        return this.http.get<Patient[]>('/visit', request);
    }

    static setVisited(visitId?: number): Promise<AxiosResponse<void>> {
        return this.http.patch<void>(`visit/${visitId}`);
    }

    static addVisit(data: Visit): Promise<AxiosResponse<void>> {
        return this.http.post<void>('visit', data);
    }


}
