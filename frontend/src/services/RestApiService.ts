import axios from 'axios';

export abstract class RestApiService {
    protected static readonly http = axios.create({
        baseURL: 'http://localhost:8090'
    });
}
