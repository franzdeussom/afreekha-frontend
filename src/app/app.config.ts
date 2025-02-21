import { CurrencyPipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, ErrorHandler, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, RouterModule, withInMemoryScrolling } from '@angular/router';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { GlobalErrorHandler } from './core/error/global-error-handler';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { ErrorService } from './shared/services/error.service';
import { NotificationService } from './shared/services/notification.service';
import { AccountState } from './shared/state/account.state';
import { AttributeState } from './shared/state/attribute.state';
import { AuthState } from './shared/state/auth.state';
import { BlogState } from './shared/state/blog.state';
import { CartState } from './shared/state/cart.state';
import { CategoryState } from './shared/state/category.state';
import { CompareState } from './shared/state/compare.state';
import { CountryState } from './shared/state/country.state';
import { CouponState } from './shared/state/coupon.state';
import { CurrencyState } from './shared/state/currency.state';
import { LoaderState } from './shared/state/loader.state';
import { NotificationState } from './shared/state/notification.state';
import { OrderStatusState } from './shared/state/order-status.state';
import { OrderState } from './shared/state/order.state';
import { PageState } from './shared/state/page.state';
import { PaymentDetailsState } from './shared/state/payment-details.state';
import { PointState } from './shared/state/point.state';
import { ProductState } from './shared/state/product.state';
import { QuestionAnswersState } from './shared/state/questions-answers.state';
import { RefundState } from './shared/state/refund.state';
import { ReviewState } from './shared/state/review.state';
import { SettingState } from './shared/state/setting.state';
import { StateState } from './shared/state/state.state';
import { StoreState } from './shared/state/store.state';
import { TagState } from './shared/state/tag.state';
import { ThemeOptionState } from './shared/state/theme-option.state';
import { ThemeState } from './shared/state/theme.state';
import { WalletState } from './shared/state/wallet.state';
import { WishlistState } from './shared/state/wishlist.state';
import { GlobalErrorHandlerInterceptor } from './core/interceptors/global-error-handler.interceptor';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

export const appConfig: ApplicationConfig = {
  providers: [
    CurrencyPipe,
    ErrorService,
    NotificationService,
    provideRouter(routes, withInMemoryScrolling({
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
      })),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      LoadingBarRouterModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
        defaultLanguage: 'en',
      }),
      NgxsModule.forRoot([
        LoaderState,
        AccountState,
        CountryState,
        StateState,
        SettingState,
        CurrencyState,
        ThemeState,
        ThemeOptionState,
        CategoryState,
        PageState,
        AttributeState,
        ProductState,
        StoreState,
        CartState,
        BlogState,
        TagState,
        WishlistState,
        CompareState,
        OrderState,
        OrderStatusState,
        WalletState,
        PointState,
        RefundState,
        PaymentDetailsState,
        NotificationState,
        QuestionAnswersState,
        ReviewState,
        CouponState
      ]),
      NgxsStoragePluginModule.forRoot({
        keys: [
          'auth',
          'account',
          'country',
          'state',
          'cart',
          'theme',
          'theme_option',
          'setting',
          'notification'
        ]
      }),
      NgxsModule.forFeature([AuthState])
    ),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideToastr({
      positionClass: 'toast-top-center',
      preventDuplicates: true
    }),
  ]
};

