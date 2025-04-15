
import { Product } from "../interface/product.interface";

export class GetCompare {
  static readonly type = "[Compare] Get";
}

export class AddToCompare {
  static readonly type = "[Compare] post";
  constructor(public payload: Product) {}
}

export class DeleteCompare {
  static readonly type = "[Compare] delete";
  constructor(public id: number) {}
}
