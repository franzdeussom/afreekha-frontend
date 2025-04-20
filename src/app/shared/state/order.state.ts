import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetOrders, ViewOrder, Checkout, PlaceOrder, Clear, VerifyPayment, RePayment } from "../action/order.action";
import { Order, OrderCheckout } from "../interface/order.interface";
import { OrderService } from "../services/order.service";
import { ClearCart } from "../action/cart.action";
import { NotificationService } from "../services/notification.service";
import { HttpErrorResponse } from "@angular/common/http";
import { AccountState } from "./account.state";
import { UpdateUserDashboard } from "../action/account.action";
import { CryptoJsService } from "../services/crypto-js.service";

export class OrderStateModel {
  order = {
    data: [] as Order[],
    total: 0
  }
  selectedOrder: Order | null
  checkout: OrderCheckout | null
}

@State<OrderStateModel>({
  name: "order",
  defaults: {
    order: {
      data: [],
      total: 0
    },
    selectedOrder: null,
    checkout: null
  },
})
@Injectable()
export class OrderState {

  constructor(private store: Store,
    private notif: NotificationService,
    private crypt: CryptoJsService,
    private router: Router,
    private orderService: OrderService) {}

  @Selector()
  static order(state: OrderStateModel) {
    return state.order;
  }

  @Selector()
  static selectedOrder(state: OrderStateModel) {
    return state.selectedOrder;
  }

  @Selector()
  static checkout(state: OrderStateModel) {
    return state.checkout;
  }

  @Action(GetOrders)
  getOrders(ctx: StateContext<OrderStateModel>, action: GetOrders) {
     this.orderService.getOrder(action.id).subscribe((resp: any)=>{
     
       if(Object.keys(resp).length > 0){
         ctx.patchState({
           order: {
             data: resp[0].data,
             total: resp?.total ? resp?.total : resp.data ? resp.data.length : 0
           }
         });
        }

     }, (error: HttpErrorResponse)=>{
        if(error.status == 403){
          this.notif.showError("Clé d'authentification expiré veuillez vous reconnecter");
          this.router.navigateByUrl("/auth/login")
        }
     });
  }

  @Action(ViewOrder)
  viewOrder(ctx: StateContext<OrderStateModel>, { id }: ViewOrder) {
    this.orderService.skeletonLoader = true;
    
    const order = ctx.getState().order.data.find(order => order.idCommande == id);
    ctx.patchState({
      ...ctx.getState(),
      selectedOrder: order
    });
    if (order) {
      this.orderService.skeletonLoader = false;
      return;
    }
    return;
  }

  @Action(Checkout)
  checkout(ctx: StateContext<OrderStateModel>, action: Checkout) {

    const state = ctx.getState();

    // It Just Static Values as per cart default value (When you are using api then you need calculate as per your requirement)
    const order = {
      total : {
        convert_point_amount: -10,
        convert_wallet_balance: -84.4,
        coupon_total_discount: 10,
        points: 300,
        points_amount: 10,
        shipping_total: 0,
        sub_total: 35.19,
        tax_total: 2.54,
        total: 37.73,
        wallet_balance: 84.4,
      }
    }

    ctx.patchState({
      ...state,
      checkout: order
    });
    
  }

  @Action(PlaceOrder)
  placeOrder(ctx: StateContext<OrderStateModel>, action: PlaceOrder) {
    const userData = this.store.selectSnapshot(AccountState.user) as any;
   
    if(userData.user.id){
      this.router.navigateByUrl('/auth/login');
    }
    //api payemnt logic here

    let paymentDone = true; //<----- waiting payement api
    
    const data = {
      idUser: userData ? userData.user.id: null,
      statut: paymentDone ? "payé": "en cours",
      article: action.payload.products,
      idAdresse: action.payload.shipping_address_id
    }
   
    this.orderService.placeOrder({data: this.crypt.encryptData(data)}).subscribe((reslt: any)=>{
        if(Object.keys(reslt).length != 0){
          this.store.dispatch(new ClearCart).subscribe({
            complete: ()=>{
                this.store.dispatch(new UpdateUserDashboard({
                  montantTotalCommandeImpaye: userData.user.montantTotalCommandeImpaye,
                  montantTotalCommandePaye : userData.user.montantTotalCommandePaye,
                  nbrTotalCommande : userData.user.nbrTotalCommande,
                  isPay: paymentDone
                })).subscribe({
                  complete: ()=>{
                    this.notif.showSuccess(reslt[0].message);

                     this.router.navigateByUrl(`/account/order`);
                  }
                });
                this.router.navigateByUrl(`/account/order`);
                
            },
          });
        }
    }, (error: HttpErrorResponse)=>{
        if(error.status == 400){
            this.notif.showError(error.error[0].message);
        }else if(error.status == 401) {
            this.notif.showError(error.error.errorMessage);
            this.router.navigateByUrl('/auth/login')
        }else if(error.status == 403){
            this.notif.showError(error.error.errorMessage);
            this.router.navigateByUrl('/auth/login')
        }else{
          this.notif.showError(error.error.errorMessage);
        }
    })
  }

  @Action(RePayment)
  verifyPayment(ctx: StateContext<OrderStateModel>, action: RePayment) {
    // Verify Payment Logic Here
  }

  @Action(VerifyPayment)
  rePayment(ctx: StateContext<OrderStateModel>, action: VerifyPayment) {
    // Re Payment Logic Here
  }

  @Action(Clear)
  clear(ctx: StateContext<OrderStateModel>) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      checkout: null
    });
  }

}
