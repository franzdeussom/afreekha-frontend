import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "../../../../public/environments/environment";
import { CartModel } from "../interface/cart.interface";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class CartService {
  
  constructor(private http: HttpClient, 
            @Inject(PLATFORM_ID) private platformId: Object
        
  ) {}

  getCartItems(): Observable<CartModel> {
    if(isPlatformBrowser(this.platformId)){
       const cart = localStorage.getItem('cart') as string;
       return cart ? JSON.parse(cart) : [];
    }else{
      // Retournez une valeur par défaut si vous êtes côté serveur
      return of({ items: [], total: 0 } as CartModel);
    }
  }

  saveCartItems(cart: CartModel){
      if(!localStorage.getItem('cart')){
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('cart save', cart);

      }else{
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('cart delete and add');
      }
  }

}
