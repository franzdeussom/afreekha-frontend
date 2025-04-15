import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { tap } from "rxjs";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Product } from "../interface/product.interface";
import { AddToWishlist, DeleteWishlist, GetWishlist } from "../action/wishlist.action";
import { WishlistService } from "../services/wishlist.service";
import { NotificationService } from "../services/notification.service";

export class WishlistStateModel {
  wishlist = {
    data: [] as Product[],
    total: 0
  }
}

@State<WishlistStateModel>({
  name: "wishlist",
  defaults: {
    wishlist: {
      data: [],
      total: 0
    }
  },
})

@Injectable()
export class WishlistState {

  constructor(public router: Router,
    private notificationService: NotificationService,
    private wishlistService: WishlistService){}

  @Selector()
  static wishlistItems(state: WishlistStateModel) {
    return state.wishlist;
  }

  @Action(GetWishlist)
  getWishlistItems(ctx: StateContext<GetWishlist>) {
    this.wishlistService.skeletonLoader = true;
    return this.wishlistService.getWishlistItems().pipe(
      tap({
        next: result => {
          console.log('result favorite', result);
          ctx.patchState({
            wishlist: {
              data: result.data,
              total: result?.total ? result?.total : result.data ? result.data.length : 0
            }
          });
        },
        complete: () => {
          this.wishlistService.skeletonLoader = false;
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(AddToWishlist)
  add(ctx: StateContext<WishlistStateModel>, action: AddToWishlist){
    // Add Wishlist Logic Here
    const state = ctx.getState();
    const wishlist = state.wishlist.data;
    const item = wishlist.find(value => value.idArticle === action.payload.idArticle);
    if (!item) {
      wishlist.push(action.payload);
    
     ctx.patchState({
        wishlist: {
          data: wishlist,
          total: state.wishlist.total + 1
        }
      });
      this.wishlistService.saveWishlist(ctx.getState().wishlist);

    } else {
      this.wishlistService.skeletonLoader = false;
      this.notificationService.showError("Product already in Favorites");
    }
    this.router.navigate(['/wishlist']);
  }

  @Action(DeleteWishlist)
  delete(ctx: StateContext<WishlistStateModel>, { id }: DeleteWishlist) {
    const state = ctx.getState();
    let item = state.wishlist.data.filter(value => value.idArticle !== id);
    ctx.patchState({
      wishlist: {
        data: item,
        total: state.wishlist.total - 1
      }
    });

    this.wishlistService.saveWishlist(ctx.getState().wishlist);
  }
}
