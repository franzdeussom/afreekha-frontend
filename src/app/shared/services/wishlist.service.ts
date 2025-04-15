import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../public/environments/environment';
import { WishlistModel } from '../interface/wishlist.interface';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  public skeletonLoader: boolean = false;
  
  constructor(private http: HttpClient) { }

  getWishlistItems(): Observable<WishlistModel> {
    const wishlist = localStorage.getItem('wishlist') ? localStorage.getItem('wishlist') as string : undefined;
    return wishlist ? of(JSON.parse(wishlist) as WishlistModel) : of({ data: [], total: 0 } as WishlistModel);
  }

  saveWishlist(wishlist: WishlistModel) {
    if (!localStorage.getItem('wishlist')) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      console.log('wishlist save', wishlist);

    } else {
      localStorage.removeItem('wishlist');
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      console.log('wishlist delete and add');
    }
  }

}
