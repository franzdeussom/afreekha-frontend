import { Injectable } from "@angular/core";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { HomeData } from "../interface/account.interface";
import { GetHomeData } from "../action/home.action";
import { AccountService } from "../services/account.service";
import { ThemeOptionService } from "../services/theme-option.service";
import { SetBrands } from "../action/brands.action";
import { SetMoreService } from "../action/more-service.action";

export class HomeStateModel {
  // Add your model properties here
  homeData: HomeData[];
}

@State<HomeStateModel>({
  name: "home",
  defaults: {
    homeData: []
  },
})

@Injectable()
export class HomeState {
    constructor(private homeService: AccountService, private themeOption: ThemeOptionService, private store: Store) {}
    
    @Selector()
    static homeData(state: HomeStateModel) {
        return state.homeData ? state.homeData: {};
    }
    
    @Action(GetHomeData)
    getHomeData(ctx: StateContext<HomeStateModel>) {
        // Add your logic here
    this.homeService.getHomeData().subscribe((result: any) => {
        ctx.patchState(
          {
            homeData: result[0].data
          }
        );
        
        this.store.dispatch(new SetBrands(result[0].data.temp.brands));
        this.store.dispatch(new SetMoreService(result[0].data.temp.moreService));
        return;
      });
      return;
    }
}