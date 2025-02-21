import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Product } from '../../../../../shared/interface/product.interface';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import * as data from  '../../../../../shared/data/owl-carousel';
import { TranslateModule } from '@ngx-translate/core';
import { ProductSidebarComponent } from '../sidebar/sidebar.component';
import { ProductDetailsTabsComponent } from '../widgets/product-details-tabs/product-details-tabs.component';
import { ProductBundleComponent } from '../widgets/product-bundle/product-bundle.component';
import { ProductSocialShareComponent } from '../widgets/product-social-share/product-social-share.component';
import { PaymentOptionComponent } from '../widgets/payment-option/payment-option.component';
import { ProductDeliveryInformationComponent } from '../widgets/product-delivery-information/product-delivery-information.component';
import { ProductInformationComponent } from '../widgets/product-information/product-information.component';
import { ProductActionComponent } from '../widgets/product-action/product-action.component';
import { ProductContainComponent } from '../widgets/product-contain/product-contain.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { isPlatformBrowser } from '@angular/common';


@Component({
    selector: 'app-product-slider',
    templateUrl: './product-slider.component.html',
    styleUrls: ['./product-slider.component.scss'],
    standalone: true,
    imports: [CarouselModule, ProductContainComponent, ProductActionComponent, ProductInformationComponent, ProductDeliveryInformationComponent, PaymentOptionComponent, ProductSocialShareComponent, ProductBundleComponent, ProductDetailsTabsComponent, ProductSidebarComponent, TranslateModule]
})
export class ProductSliderComponent {

  @Input() product: Product;
  @Input() option: Option | null;

  public productSliderLayout = data.productSliderLayout;

  public isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
}
