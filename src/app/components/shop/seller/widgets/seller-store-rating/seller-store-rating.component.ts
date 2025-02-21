import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';
import { TranslateModule } from '@ngx-translate/core';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-seller-store-rating',
    templateUrl: './seller-store-rating.component.html',
    styleUrls: ['./seller-store-rating.component.scss'],
    standalone: true,
    imports: [NgbRating, TranslateModule]
})
export class SellerStoreRatingComponent {

  @Input() store: Stores;

}
