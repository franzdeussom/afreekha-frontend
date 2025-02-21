import { Component, Input } from '@angular/core';
import { Product } from '../../../../shared/interface/product.interface';
import { ProductBoxHorizontalComponent } from './product-box-horizontal/product-box-horizontal.component';
import { ProductBoxVerticalComponent } from './product-box-vertical/product-box-vertical.component';


@Component({
    selector: 'app-product-box',
    templateUrl: './product-box.component.html',
    styleUrls: ['./product-box.component.scss'],
    standalone: true,
    imports: [ProductBoxVerticalComponent, ProductBoxHorizontalComponent]
})
export class ProductBoxComponent {
  
  @Input() product: Product;
  @Input() style: string  = 'horizontal';
  @Input() class: string;
  @Input() close: boolean = false;

}
