import { Component, Input } from '@angular/core';
import { Params } from '../../../../../shared/interface/core.interface';
import { Stores } from '../../../../../shared/interface/store.interface';
import { TranslateModule } from '@ngx-translate/core';
import { CollectionProductsComponent } from '../../../collection/widgets/collection-products/collection-products.component';
import { RouterLink } from '@angular/router';
import { SellerStoreSocialLinksComponent } from '../../widgets/seller-store-social-links/seller-store-social-links.component';
import { SellerStoreDescriptionComponent } from '../../widgets/seller-store-description/seller-store-description.component';
import { SellerStoreRatingComponent } from '../../widgets/seller-store-rating/seller-store-rating.component';
import { SellerStoreNameComponent } from '../../widgets/seller-store-name/seller-store-name.component';
import { SellerStoreLogoComponent } from '../../widgets/seller-store-logo/seller-store-logo.component';
import { CollectionSidebarComponent } from '../../../collection/widgets/sidebar/sidebar.component';

@Component({
    selector: 'app-seller-details-classic',
    templateUrl: './seller-details-classic.component.html',
    styleUrls: ['./seller-details-classic.component.scss'],
    standalone: true,
    imports: [CollectionSidebarComponent, SellerStoreLogoComponent, SellerStoreNameComponent, SellerStoreRatingComponent, SellerStoreDescriptionComponent, SellerStoreSocialLinksComponent, RouterLink, CollectionProductsComponent, TranslateModule]
})
export class SellerDetailsClassicComponent {

  @Input() filter: Params;
  @Input() store: Stores;

}
