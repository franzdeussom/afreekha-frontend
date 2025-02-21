import { Component, Input } from '@angular/core';
import { Product } from '../../../../../shared/interface/product.interface';
import { Option } from '../../../../../shared/interface/theme-option.interface';
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


@Component({
    selector: 'app-product-sticky',
    templateUrl: './product-sticky.component.html',
    styleUrls: ['./product-sticky.component.scss'],
    standalone: true,
    imports: [ProductContainComponent, ProductActionComponent, ProductInformationComponent, ProductDeliveryInformationComponent, PaymentOptionComponent, ProductSocialShareComponent, ProductBundleComponent, ProductDetailsTabsComponent, ProductSidebarComponent, TranslateModule]
})
export class ProductStickyComponent {

  @Input() product: Product;
  @Input() option: Option | null;

}
