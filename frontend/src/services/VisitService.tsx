import {RestApiService} from './RestApiService';
import {AxiosResponse} from 'axios';
import {Patient} from "../dto/Patient";

export class VisitService extends RestApiService {

  static getVisits(patientId?:number, doctorId?: number): Promise<AxiosResponse<Patient[]>> {
    const request = {
      params: {
        patientId: patientId,
        doctorId: doctorId,
      }
    }
    return this.http.get<Patient[]>('/visit',request);
  }
  static setVisited(visitId?: number): Promise<AxiosResponse<void>> {
    return this.http.patch<void>(`visit/${visitId}`);
  }


}
