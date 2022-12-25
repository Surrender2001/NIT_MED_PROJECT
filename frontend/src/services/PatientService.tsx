import {RestApiService} from './RestApiService';
import {AxiosResponse} from 'axios';
import {Patient} from "../dto/Patient";

export class PatientService extends RestApiService {

    static getPatients(): Promise<AxiosResponse<Patient[]>> {
        return this.http.get<Patient[]>('/patient');
    }

}
