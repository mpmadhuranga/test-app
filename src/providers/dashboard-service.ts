import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { configurations } from '../configurations/configurations';

@Injectable()
export class DashboardService {

    constructor(private http: HttpClient) {

    }

    getAllDetails() {
        let params;
        return this.http.post(configurations.baseUrl + 'getAllDetails', params);
    }

    getDetailsByTag(params) {
        return this.http.post(configurations.baseUrl + 'getDetailsByTag', params);
    }

}
