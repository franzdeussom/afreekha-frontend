import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';

import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-seller-store-logo',
    templateUrl: './seller-store-logo.component.html',
    styleUrls: ['./seller-store-logo.component.scss'],
    standalone: true,
    imports: [RouterLink]
})
export class SellerStoreLogoComponent {

  @Input() store: Stores;

}
