import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';
import { StoreService } from '../../../../../shared/services/store.service';
import { TranslateModule } from '@ngx-translate/core';
import { SellerStoreLogoComponent } from '../../widgets/seller-store-logo/seller-store-logo.component';
import { RouterLink } from '@angular/router';
import { SellerStoreRatingComponent } from '../../widgets/seller-store-rating/seller-store-rating.component';
import { SellerStoreNameComponent } from '../../widgets/seller-store-name/seller-store-name.component';
import { SellerContactDetailsComponent } from '../../widgets/seller-contact-details/seller-contact-details.component';
import { SkeletonSellerStoreComponent } from '../skeleton-seller-store/skeleton-seller-store.component';


@Component({
    selector: 'app-seller-store-classic',
    templateUrl: './seller-store-classic.component.html',
    styleUrls: ['./seller-store-classic.component.scss'],
    standalone: true,
    imports: [SkeletonSellerStoreComponent, SellerContactDetailsComponent, SellerStoreNameComponent, SellerStoreRatingComponent, RouterLink, SellerStoreLogoComponent, TranslateModule]
})
export class SellerStoreClassicComponent {

  @Input() stores: Stores[];
  @Input() skeletonItems: number[];

  constructor(public storeService: StoreService) { }
  
}
