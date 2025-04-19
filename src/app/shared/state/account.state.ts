import { Injectable } from "@angular/core";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { of, tap } from "rxjs";
import { GetUserDetails, UpdateUserProfile, UpdateUserPassword, 
         CreateAddress, UpdateAddress, DeleteAddress, AccountClear } from "../action/account.action";
import { AccountUser, AccountUserUpdatePassword } from "./../interface/account.interface";
import { AccountService } from "../services/account.service";
import { NotificationService } from "../services/notification.service";
import { Permission } from "../interface/role.interface";
import { UserAddress } from "../interface/user.interface";
import { HttpErrorResponse } from "@angular/common/http";
import { CryptoJsService } from "../services/crypto-js.service";

export class AccountStateModel {
  user: AccountUser | null;
  permissions: Permission[];
  adresse: UserAddress[];
}
@State<AccountStateModel>({
    name: "account",
    defaults: {
      user: null,
      permissions: [],
      adresse: []
    },
})

@Injectable()
export class AccountState {

  constructor(private accountService: AccountService, 
              private notificationService: NotificationService,
              private crypto: CryptoJsService,
              private store: Store,
            ) {}

  @Selector()
  static user(state: AccountStateModel) {
    return state.user;
  }

  @Selector()
  static permissions(state: AccountStateModel) {
    return state.permissions;
  }

  @Action(GetUserDetails)
  getUserDetails(ctx: StateContext<AccountStateModel>) {
    const user = this.accountService.getUserDetails();
    if(user){
      ctx.patchState({
        user: user,
        permissions: user.permission || [],
      });
      return of(user);
    }
  
  }

  @Action(UpdateUserProfile)
  updateProfile(ctx: StateContext<AccountStateModel>, { payload }: UpdateUserProfile) {
    // Update Profile Logic Here
    const user = this.store.selectSnapshot(AccountState.user) as any;
    console.log('payload update:', payload, user?.id);
    const data = {
        data: this.crypto.encryptData(payload),
    }
    this.accountService.updateUserProfile(data, String(user?.user?.id)).subscribe((resp: any)=>{
      this.notificationService.showSuccess("Profile updated successfully");
      ctx.patchState({
        user: { ...ctx.getState().user, ...payload }
      });
    }, (error: HttpErrorResponse)=> {
      if(error.status == 400){
        this.notificationService.showError(error.error[0].message);
      }
    });

  }

  @Action(UpdateUserPassword)
  updatePassword(ctx: StateContext<AccountUserUpdatePassword>, { payload }: UpdateUserPassword) {
    // Update Password Logic Here
    const user = this.store.selectSnapshot(AccountState.user) as any;
    const data = {
        password: payload.current_password,
        newPassword: payload.password
    }

    this.accountService.updateUserPassword({data: this.crypto.encryptData(data)}, String(user?.user?.id)).subscribe((resp: any)=>{
      this.notificationService.showSuccess("Password updated successfully");
      
    }, (error: HttpErrorResponse)=> {
      if(error.status == 400){
        this.notificationService.showError(error.error.message);
      }
    });
  }

  @Action(CreateAddress)
  createAddress(ctx: StateContext<AccountStateModel>, action: CreateAddress) {
    // Create Address Logic Here
    const data = {
      data: this.crypto.encryptData(action.payload)
    }

    this.accountService.createAdresse(data).subscribe((resp: any)=>{
      this.notificationService.showSuccess("Adresse created successfully");
      let user = this.store.selectSnapshot(AccountState.user);
      
      if (user && user.adresses) {
        user.adresses = [...user.adresses, this.crypto.decryptData(resp[0].data)];
      }

      ctx.patchState({
        user: user,
        adresse: [...ctx.getState().adresse, this.crypto.decryptData(resp[0].data)]
      });

    }, (error: HttpErrorResponse)=> {
      
       if(error.status == 400){
        this.notificationService.showError(error.error[0].message);
       }
    }) 
  }

  @Action(UpdateAddress)
  updateAddress(ctx: StateContext<AccountStateModel>, action: UpdateAddress) {
    // Update Address Logic Here 
    const data = {
      data: this.crypto.encryptData(action.payload)
    }
   
    this.accountService.updateAdresse(data).subscribe((resp: any)=>{
      this.notificationService.showSuccess("Adresse updated successfully");
      let user = this.store.selectSnapshot(AccountState.user);

      if(user && user.adresses){
        user.adresses = user.adresses.map((addr) => addr.idAdresse === action.payload.idAdresse ? action.payload : addr)
      }

      ctx.patchState({
        user: user,
        adresse: user?.adresses 
      });

    }, (error: HttpErrorResponse)=> {
      
       if(error.status == 400){
        this.notificationService.showError(error.error[0].message);
       }
    })
  }

  @Action(DeleteAddress)
  deleteAddress(ctx: StateContext<AccountStateModel>, action: DeleteAddress) {
    // Delete Address Logic Here
    this.accountService.deleteAdresse(action.id).subscribe((resp: any)=>{
      if(Object.keys(resp).length != 0){
        this.notificationService.showSuccess("Adresse deleted successfully");
        let user = this.store.selectSnapshot(AccountState.user);
        if (user && user.adresses) {
          user.adresses = user.adresses.filter((addr) => addr.idAdresse !== action.id);
        }
        ctx.patchState({
          user: user,
          adresse: ctx.getState().adresse.filter((addr) => addr.idAdresse !== action.id)
        });
      }
      
    }, (error: HttpErrorResponse)=> {
      
       if(error.status == 400){
        this.notificationService.showError(error.error[0].message);
       }
    })
  }

  @Action(AccountClear)
  accountClear(ctx: StateContext<AccountStateModel>){
    ctx.patchState({
      user: null,
      permissions: [],
      adresse: []
    });
  }

}