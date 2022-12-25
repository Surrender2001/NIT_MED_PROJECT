import {RestApiService} from './RestApiService';
import {AxiosResponse} from 'axios';
import {Doctor} from "../dto/Doctor";

export class DoctorService extends RestApiService {

    static getDoctors(professionId?: number): Promise<AxiosResponse<Doctor[]>> {
        const request = {
            params: {
                professionId: professionId
            }
        }
        return this.http.get<Doctor[]>('/doctor', request);
    }

}
