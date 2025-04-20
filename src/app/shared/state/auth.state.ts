import { Injectable } from "@angular/core";
import { Store, State, Selector, Action, StateContext } from "@ngxs/store";
import { Router } from '@angular/router';
import { AccountClear, GetUserDetails } from "../action/account.action";
import { Register, Login, ForgotPassWord, VerifyEmailOtp, UpdatePassword, Logout, AuthClear } from "../action/auth.action";
import { NotificationService } from "../services/notification.service";
import { AuthService } from "../services/auth.service";
import { tap } from "rxjs";
import { CryptoJsService } from "../services/crypto-js.service";
import { User } from "../interface/user.interface";
import { error } from "console";
import { HttpErrorResponse } from "@angular/common/http";

export interface AuthStateModel {
  email: String;
  token: String | Number;
  access_token: String | null;
  code: number | string
}

@State<AuthStateModel>({
  name: "auth",
  defaults: {
    email: '',
    token: '',
    access_token: '',
    code: ''
  },
})
@Injectable()
export class AuthState {

  constructor(private store: Store, public router: Router,
    private authService: AuthService,
    private crypt: CryptoJsService,
    private notificationService: NotificationService) {}


  /*ngxsOnInit(ctx: StateContext<AuthStateModel>) {
    // Pre Fake Login (if you are using ap
    ctx.patchState({
      email: 'john.customer@example.com',
      token: '',
      access_token: '115|laravel_sanctum_mp1jyyMyKeE4qVsD1bKrnSycnmInkFXXIrxKv49w49d2a2c5'
    })
  }*/

  @Selector()
  static accessToken(state: AuthStateModel): String  | null{
    return state ? state.access_token || '' : '';
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): Boolean {
    return !!state.access_token;
  }

  @Selector()
  static email(state: AuthStateModel): String {
    return state.email;
  }

  @Selector()
  static token(state: AuthStateModel): String | Number {
    return state.token;
  }

  @Action(Register)
  register(ctx: StateContext<AuthStateModel>, action: Register) {
    // Register Logic Here
    this.authService.register(action.payload).subscribe((result: any)=> {
      const data = this.crypt.decryptData(result.reps) as {user: User};
      this.notificationService.showSuccess("Registration successful");
      //save the retrieved data
      localStorage.setItem("UserDetails", JSON.stringify(result.reps));
      ctx.patchState({
        email: data.user.email,
        token: result.accessToken,
        access_token: result.accessToken || ''
      });
      this.router.navigateByUrl('/auth/login');
    }, (error: HttpErrorResponse)=>{
        if(error.status == 404){
          this.notificationService.showError(error.error.message);
        }else if(error.status == 400){
          console.log("error", error);
        }
    });
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    // Login Logic Here
    const isTel = Number.parseInt(action.payload.email);
    let data: any; 
    if(isTel){
      data = {
        tel: action.payload.email,
        mot_de_passe: action.payload.password
      }
    }else{
      data = {
        email: action.payload.email,
        mot_de_passe: action.payload.password
      }
    }
   this.authService.login({data: this.crypt.encryptData(data)}).subscribe((result)=> {
  
          const data = this.crypt.decryptData(result.reps) as {user: User};
          this.notificationService.showSuccess("Login successful");
          //save the retrieved data
          localStorage.setItem("UserDetails", JSON.stringify(data));

          ctx.patchState({
            email: data.user.email,
            token: result.accessToken,
            access_token: result.accessToken || ''
          });
          this.store.dispatch(new GetUserDetails());
          const redirectUrl = this.authService.redirectUrl || '/account/dashboard';
          this.router.navigateByUrl(redirectUrl);

          // Clear the stored redirect URL
          this.authService.redirectUrl = undefined;
    },
    (error: HttpErrorResponse)=> {
      if(error.status == 400){
         this.notificationService.showError(error.error.message)
      }else{
        this.notificationService.showError(error.error.message);
      }
     });
  
  }

  @Action(ForgotPassWord)
  forgotPassword(ctx: StateContext<AuthStateModel>, action: ForgotPassWord) {
    // Forgot Password Logic Here
    this.authService.fortgotPassword(action.payload.email).subscribe((resp: any)=>{
        if(Object.keys(resp).length != 0){
          if(resp.done){
              ctx.dispatch({
                code: resp.code
              });
              this.notificationService.showSuccess('Recovery code send to this address'+action.payload.email);
              this.router.navigateByUrl('/auth/otp'); 
          }
        }else{
          this.notificationService.showError('Something wrong');
        }
    }, (error: HttpErrorResponse)=>{
        if(error.status == 404){
          this.notificationService.showError(error.error.message);
        }
    });
  }

  @Action(VerifyEmailOtp)
  verifyEmail(ctx: StateContext<AuthStateModel>, action: VerifyEmailOtp) {
    // Verify Logic Here
    const code = ctx.getState().code as number;
    return Number.parseInt(action.payload.token) == code;
  }

  @Action(UpdatePassword)
  updatePassword(ctx: StateContext<AuthStateModel>, action: UpdatePassword) {
    // Update Password Logic Here
    const data = {
       token: action.payload.token,
    }
    console.log('value resting', action.payload);
      this.authService.resetPassword(data).subscribe((resp: any)=>{
          if(Object.keys(resp).length != 0){
              this.router.navigateByUrl('/auth/login'); 
          }
      }, (error: HttpErrorResponse)=>{
          if(error.status == 404){
            this.notificationService.showError(error.error.message);
          }else{
            this.notificationService.showError(error.error.message);
          }
      });
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    // Logout LOgic Here
    localStorage.clear();
    this.store.dispatch(new AuthClear());
  }

  @Action(AuthClear)
  authClear(ctx: StateContext<AuthStateModel>){
    ctx.patchState({
      email: '',
      token: '',
      access_token: null,
    });
    this.store.dispatch(new AccountClear());
  }

}
