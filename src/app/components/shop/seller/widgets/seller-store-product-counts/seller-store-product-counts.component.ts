import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-seller-store-product-counts',
    templateUrl: './seller-store-product-counts.component.html',
    styleUrls: ['./seller-store-product-counts.component.scss'],
    standalone: true,
    imports: [RouterLink, TranslateModule]
})
export class SellerStoreProductCountsComponent {

  @Input() store: Stores;

}
