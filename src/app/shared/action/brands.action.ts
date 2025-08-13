
export class SetBrands {
  static readonly type = "[Brands] Set Brands";
  constructor(public payload: any) {}
}


export class GetBrands {
  static readonly type = "[Brands] Get Brands";
  constructor(public payload: any) {}
}
