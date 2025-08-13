import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { Attachment } from "../interface/attachment.interface";
import { GetBrands, SetBrands } from "../action/brands.action";
import { GetMoreService, SetMoreService } from "../action/more-service.action";

export class MoreServiceStateModel {
    servicesOne: Attachment[]
    servicesTwo: Attachment[]
    total: number
}

@State<MoreServiceStateModel>({
  name: "moreService",
  defaults: {
    servicesOne: [],
    servicesTwo: [],
    total: 0
  }
})

@Injectable()
export class MoreServiceState {

  constructor(private store: Store, public router: Router){}

  @Selector()
  static moreSericeOne(state: MoreServiceStateModel) {
    return  state.servicesOne || [];
  }

  @Selector()
  static moreSericeTwo(state: MoreServiceStateModel) {
    return  state.servicesTwo || [];
  }

  @Selector()
  static moreServiceTotal(state: MoreServiceStateModel) {
    return state.total;
  }

  @Action(GetMoreService)
  getMoreServiceItems(ctx: StateContext<GetBrands>) {
    
  }

  @Action(SetMoreService)
  setSetMoreService(ctx: StateContext<MoreServiceStateModel>, action: SetMoreService){
    // Add Compare Logic
    const firstFour = action.payload.slice(0, 4); // Retourne les 4 premiers éléments
    const secondFour = action.payload.slice(4, action.payload.length); // Retourne les 4 premiers éléments

    ctx.patchState({
      servicesOne: firstFour,
      servicesTwo: secondFour
    });
  }
}
