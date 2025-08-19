import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "public/environments/environment";

@Injectable({
    providedIn: 'root',
})

export class TimerService{
    constructor(
        private http : HttpClient
    ){}

    getTimer(){
    return this.http.get(`${environment.baseURL}api/admin/timer`)
    }
}