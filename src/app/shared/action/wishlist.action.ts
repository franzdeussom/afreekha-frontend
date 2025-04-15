import { Params } from "../interface/core.interface";
import { Product } from "../interface/product.interface";

export class GetWishlist {
  static readonly type = "[Wishlist] Get";
}

export class AddToWishlist {
  static readonly type = "[Wishlist] post";
  constructor(public payload: Product) {}
}

export class DeleteWishlist {
  static readonly type = "[Wishlist] delete";
  constructor(public id: number) {}
}
