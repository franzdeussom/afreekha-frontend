import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';
import { TitleCasePipe } from '../../../../../shared/pipe/title-case.pipe';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-seller-store-name',
    templateUrl: './seller-store-name.component.html',
    styleUrls: ['./seller-store-name.component.scss'],
    standalone: true,
    imports: [RouterLink, TitleCasePipe]
})
export class SellerStoreNameComponent {

  @Input() store: Stores;
  
}
