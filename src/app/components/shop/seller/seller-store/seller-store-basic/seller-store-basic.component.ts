import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';
import { StoreService } from '../../../../../shared/services/store.service';
import { TranslateModule } from '@ngx-translate/core';
import { SellerStoreProductsComponent } from '../../widgets/seller-store-products/seller-store-products.component';
import { RouterLink } from '@angular/router';
import { SellerContactDetailsComponent } from '../../widgets/seller-contact-details/seller-contact-details.component';
import { SellerStoreProductCountsComponent } from '../../widgets/seller-store-product-counts/seller-store-product-counts.component';
import { SellerStoreNameComponent } from '../../widgets/seller-store-name/seller-store-name.component';
import { SellerStoreRatingComponent } from '../../widgets/seller-store-rating/seller-store-rating.component';
import { SellerStoreLogoComponent } from '../../widgets/seller-store-logo/seller-store-logo.component';
import { SkeletonSellerStoreComponent } from '../skeleton-seller-store/skeleton-seller-store.component';


@Component({
    selector: 'app-seller-store-basic',
    templateUrl: './seller-store-basic.component.html',
    styleUrls: ['./seller-store-basic.component.scss'],
    standalone: true,
    imports: [SkeletonSellerStoreComponent, SellerStoreLogoComponent, SellerStoreRatingComponent, SellerStoreNameComponent, SellerStoreProductCountsComponent, SellerContactDetailsComponent, RouterLink, SellerStoreProductsComponent, TranslateModule]
})
export class SellerStoreBasicComponent {

  @Input() stores: Stores[];
  @Input() skeletonItems: number[];

  constructor(public storeService: StoreService) { }

}
