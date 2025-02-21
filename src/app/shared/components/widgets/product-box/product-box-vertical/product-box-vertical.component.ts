import { Component, Input } from '@angular/core';
import { Product } from '../../../../../shared/interface/product.interface';
import { CurrencySymbolPipe } from '../../../../pipe/currency-symbol.pipe';

import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-product-box-vertical',
    templateUrl: './product-box-vertical.component.html',
    styleUrls: ['./product-box-vertical.component.scss'],
    standalone: true,
    providers:[CurrencySymbolPipe],
    imports: [RouterLink, CurrencySymbolPipe]
})
export class ProductBoxVerticalComponent {

  @Input() product: Product;

}
