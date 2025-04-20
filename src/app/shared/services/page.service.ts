import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../public/environments/environment";
import { Params } from "../interface/core.interface";
import { ContactUsModel } from "../interface/page.interface";
import { ROUTES_API } from "../api/routes";

@Injectable({
  providedIn: "root",
})
export class PageService {

  public skeletonLoader: boolean = false;
  
  constructor(private http: HttpClient) {}

  getFaqs(): Observable<any> {
    return this.http.get(`${environment.URL}/faq.json`);
  }

  sendMessage(payload: any):Observable<any>{
    return this.http.post<any>(`${environment.URL_API}/api${ROUTES_API.MESSAGE.POST}`, payload)
  } 
  
}
