import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';
import { TranslateModule } from '@ngx-translate/core';


@Component({
    selector: 'app-seller-store-social-links',
    templateUrl: './seller-store-social-links.component.html',
    styleUrls: ['./seller-store-social-links.component.scss'],
    standalone: true,
    imports: [TranslateModule]
})
export class SellerStoreSocialLinksComponent {

  @Input() store: Stores;

}
