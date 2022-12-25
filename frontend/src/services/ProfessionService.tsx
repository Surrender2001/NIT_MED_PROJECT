import {RestApiService} from './RestApiService';
import {AxiosResponse} from 'axios';
import {Profession} from "../dto/Profession";

export class ProfessionService extends RestApiService {

    static getProfessions(): Promise<AxiosResponse<Profession[]>> {
        return this.http.get<Profession[]>('/profession');
    }

}
