import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ThemeOptionState } from '../../../../../shared/state/theme-option.state';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { Product } from '../../../../../shared/interface/product.interface';
import { ProductBannerComponent } from '../widgets/product-banner/product-banner.component';
import { TrendingProductsComponent } from '../widgets/trending-products/trending-products.component';


@Component({
    selector: 'app-product-details-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: true,
    imports: [ TrendingProductsComponent, ProductBannerComponent]
})
export class ProductSidebarComponent {

  themeOptions$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  @Input() product: Product;

}
