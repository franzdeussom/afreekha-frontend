import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { Option } from '../../../../../../shared/interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';


@Component({
    selector: 'app-payment-option',
    templateUrl: './payment-option.component.html',
    styleUrls: ['./payment-option.component.scss'],
    standalone: true,
    imports: [TranslateModule]
})
export class PaymentOptionComponent {

  @Input() product: Product;
  @Input() option: Option | null;

}
