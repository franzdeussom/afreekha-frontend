import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-seller-contact-details',
    templateUrl: './seller-contact-details.component.html',
    styleUrls: ['./seller-contact-details.component.scss'],
    standalone: true,
    imports: [TranslateModule]
})
export class SellerContactDetailsComponent {

  @Input() store: Stores;

}
