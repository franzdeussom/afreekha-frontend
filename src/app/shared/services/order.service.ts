import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../public/environments/environment';
import { OrderModel } from '../interface/order.interface';
import { Params } from '../interface/core.interface';
import { ROUTES_API } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public skeletonLoader: boolean = false;
  offset : number = 0;
  constructor(private http: HttpClient) {}

  getOrders(payload?: Params): Observable<OrderModel> {
    return this.http.get<OrderModel>(`${environment.URL}/order.json`, { params: payload });
  }
  getOrder(id: number | undefined): Observable<OrderModel> {
     return this.http.get<OrderModel>(`${environment.URL_API}/api${ROUTES_API.ORDER.GET_BY_ID(String(id), String(this.offset))}`);
  }

  placeOrder(payload: any): Observable<{message: string, data: any, updateMsg: any, amountToBuy: number}> {
    return this.http.post<{message: string, data: any, updateMsg: any, amountToBuy: number}>(`${environment.URL_API}/api${ROUTES_API.ORDER.POST}`, payload);
  }
}
