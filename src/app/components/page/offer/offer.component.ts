import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { CouponState } from '../../../shared/state/coupon.state';
import { CouponService } from './../../../shared/services/coupon.service';
import { GetCoupons } from '../../../shared/action/coupon.action';
import { CouponModel } from '../../../shared/interface/coupon.interface';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { AsyncPipe } from '@angular/common';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-offer',
    templateUrl: './offer.component.html',
    styleUrls: ['./offer.component.scss'],
    standalone: true,
    imports: [BreadcrumbComponent, NoDataComponent, AsyncPipe, TranslateModule]
})
export class OfferComponent {

  public skeletonItems = Array.from({ length: 8 }, (_, index) => index);
  public breadcrumb: Breadcrumb = {
    title: "Offer",
    items: [{ label: "Offer", active: true }]
  }

  coupon$: Observable<CouponModel> = inject(Store).select(CouponState.coupon);

  constructor(private store: Store, public couponService: CouponService){
    this.store.dispatch(new GetCoupons({ status: 1 }))
  }

  copyFunction(txt:string){
    navigator.clipboard.writeText(txt);
  }
}
