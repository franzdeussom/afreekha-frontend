import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../public/environments/environment";
import { AccountUser, HomeData } from "../interface/account.interface";
import { ROUTES_API } from "../api/routes";
import { CryptoJsService } from "./crypto-js.service";
import { UserAddress } from "../interface/user.interface";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class AccountService {

  constructor(private http: HttpClient, private crypt: CryptoJsService, @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getUserDetails(): any | null{
     //return 
     if(isPlatformBrowser(this.platformId)){
      const data = JSON.parse(localStorage.getItem("UserDetails")!) || null ? this.crypt.decryptData(JSON.parse(localStorage.getItem("UserDetails")!)): null;
    
      return data;
     }else{
      return null;
     }
     
      //return this.http.get<AccountUser>(`${environment.URL}/account.json`);
  }

  getHomeData(): Observable<HomeData>{
  
    return this.http.get<HomeData>(`${environment.URL_API}/api${ROUTES_API.HOME.GET}`);
  }

  updateUserProfile(payload: any): Observable<AccountUser> {
    return this.http.put<AccountUser>(`${environment.URL_API}/api${ROUTES_API.USERS.UPDATE}`, payload);
  }

  updateUserPassword(payload: any, id: string): Observable<any>{
    return this.http.put<any>(`${environment.URL_API}/api${ROUTES_API.USERS.UPDATE_PASSWORD(id)}`, payload);
  }

  createAdresse(payload: any): Observable<UserAddress>{
    return this.http.post<UserAddress>(`${environment.URL_API}/api${ROUTES_API.ADRESSE.POST_GET_PUT}`, payload )
  }

  updateAdresse(payload: any): Observable<UserAddress>{
    return this.http.put<UserAddress>(`${environment.URL_API}/api${ROUTES_API.ADRESSE.POST_GET_PUT}`, payload )
  }

  deleteAdresse(id: number): Observable<UserAddress>{
    return this.http.delete<UserAddress>(`${environment.URL_API}/api${ROUTES_API.ADRESSE.DELETE}${id}` );
  }
}
