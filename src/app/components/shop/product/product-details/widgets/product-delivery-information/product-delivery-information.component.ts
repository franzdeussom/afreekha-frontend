import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { TranslateModule } from '@ngx-translate/core';


@Component({
    selector: 'app-product-delivery-information',
    templateUrl: './product-delivery-information.component.html',
    styleUrls: ['./product-delivery-information.component.scss'],
    standalone: true,
    imports: [TranslateModule]
})
export class ProductDeliveryInformationComponent {
  
  @Input() product: Product | null;

}
