import { inject, Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { AuthState } from "../state/auth.state";
import { HttpClient } from "@angular/common/http";
import { User } from "../interface/user.interface";
import { environment } from "public/environments/environment";
import { ROUTES_API } from "../api/routes";
import { CryptoJsService } from "./crypto-js.service";

export interface LoginResponse{
    accessToken: string,
    reps: string,
    done: boolean,
};

@Injectable({
  providedIn: "root",
})
export class AuthService {

  token$: Observable<any> = inject(Store).select(AuthState.accessToken) as Observable<any>
  
  public redirectUrl: string | undefined;

  constructor(private http: HttpClient, private crypt: CryptoJsService ){
    this.token$.subscribe((data: any)=> { this.token$ = data});
  }
  // Auth Function Here

  login(payload: any): Observable<LoginResponse>{
      
      return this.http.post<LoginResponse>(`${environment.URL_API}/api${ROUTES_API.USERS.AUTH_LOGIN}`, payload);
  }

  register(payload: any): Observable<User>{
      return this.http.post<User>(`${environment.URL_API}/api${ROUTES_API.USERS.REGISTER}`, {data: this.crypt.encryptData(payload)});
  }

  fortgotPassword(payload: any): Observable<{message: string, done: boolean}>{
    return this.http.post<{message: string, done: boolean}>(`${environment.URL_API}/api${ROUTES_API.USERS.SEND_CODE}`, payload)
  }

  resetPassword(payload: any): Observable<{message: string, done: boolean}>{
    return this.http.post<{message: string, done: boolean}>(`${environment.URL_API}/api${ROUTES_API.USERS.RESET_PASSWORD}`, payload);
  }

}
