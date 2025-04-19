import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../public/environments/environment';
import { ProductModel } from '../interface/product.interface';
import { Params } from '../interface/core.interface';
import { ROUTES_API } from '../api/routes';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public skeletonLoader: boolean = false;

  constructor(private http: HttpClient) {}

  getProducts(payload?: Params): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${environment.URL}/product.json`, { params: payload });
  }

  getProduct(offset: number, payload?: Params): Observable<ProductModel>{
    return this.http.get<ProductModel>(`${environment.URL_API}/api${ROUTES_API.ARTICLE.GET(''+offset)}`, {params: payload });
  }

  getOne(id: string):Observable<ProductModel>{
    return this.http.get<ProductModel>(`${environment.URL_API}/api${ROUTES_API.ARTICLE.GET_BY_ID(id)}`);
  }

  deleteProduct(id: string): any{
    return this.http.delete(`${environment.URL}/api${ROUTES_API.ARTICLE.DELETE(id)}`);
  }

  createProduct(payload: ProductModel): Observable<ProductModel>{
    return this.http.post<ProductModel>(`${environment.URL}/api${ROUTES_API.ARTICLE.CREATE}`, payload);
  }

  updateProduct(id: string, payload: ProductModel): Observable<ProductModel>{
    return this.http.put<ProductModel>(`${environment.URL}/api${ROUTES_API.ARTICLE.UPDATE(id)}`, payload);
  }

}
