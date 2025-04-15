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
}

@State<AuthStateModel>({
  name: "auth",
  defaults: {
    email: '',
    token: '',
    access_token: ''
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
    });
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    // Login Logic Here
   this.authService.login(action.payload).subscribe((result)=> {
  
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
          console.log('execute', redirectUrl)
          this.router.navigateByUrl(redirectUrl);

          // Clear the stored redirect URL
          this.authService.redirectUrl = undefined;
    },
    (error: HttpErrorResponse)=> {
      if(error.status == 400){
         this.notificationService.showError(error.error[0].message)
      }
     });
  
  }

  @Action(ForgotPassWord)
  forgotPassword(ctx: StateContext<AuthStateModel>, action: ForgotPassWord) {
    // Forgot Password Logic Here
  }

  @Action(VerifyEmailOtp)
  verifyEmail(ctx: StateContext<AuthStateModel>, action: VerifyEmailOtp) {
    // Verify Logic Here
  }

  @Action(UpdatePassword)
  updatePassword(ctx: StateContext<AuthStateModel>, action: UpdatePassword) {
    // Update Password Logic Here
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
