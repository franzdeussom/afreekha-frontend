import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { NotificationService } from '../../shared/services/notification.service';
import { Values } from '../../shared/interface/setting.interface';
import { GetSettingOption } from '../../shared/action/setting.action';
import { SettingState } from '../../shared/state/setting.state';
import { AuthClear } from '../../shared/action/auth.action';
import { GetStates } from '../../shared/action/state.action';
import { GetCountries } from '../../shared/action/country.action';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  setting$: Observable<Values> = inject(Store).select(SettingState.setting) as Observable<Values>;

  public isMaintenanceModeOn: boolean = false;

  constructor(private store: Store, private router: Router,
    private notificationService: NotificationService) {
   
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {

    // If Maintainance Mode On
    if(this.isMaintenanceModeOn) {
      this.router.navigate(['/maintenance']);
    }

    const token = this.store.selectSnapshot(state => state.auth.access_token);
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.notificationService.notification = false;
          this.store.dispatch(new AuthClear());
        }
        return throwError(() => error);
      })
    );

  }
}
