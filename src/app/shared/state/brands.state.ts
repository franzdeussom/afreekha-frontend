import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { Attachment } from "../interface/attachment.interface";
import { GetBrands, SetBrands } from "../action/brands.action";

export class BrandsStateModel {
    items: Attachment[]
    total: number
}

@State<BrandsStateModel>({
  name: "brands",
  defaults: {
    items: [],
    total: 0
  }
})

@Injectable()
export class BrandsState {

  constructor(private store: Store, public router: Router){}

  @Selector()
  static brandItems(state: BrandsStateModel) {
    return state.items || [];
  }

  @Selector()
  static brandsTotal(state: BrandsStateModel) {
    return state.total;
  }

  @Action(GetBrands)
  getBrandsItems(ctx: StateContext<GetBrands>) {
    
  }

  @Action(SetBrands)
  setBrands(ctx: StateContext<BrandsStateModel>, action: SetBrands){
    // Add Compare Logic
    const state = ctx.getState();
    ctx.patchState({
        items: action.payload
      });
  }
}
