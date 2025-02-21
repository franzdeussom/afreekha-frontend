import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProductModel } from '../../../../shared/interface/product.interface';
import { SliderProductsTokyo } from '../../../../shared/interface/theme.interface';
import { ProductState } from '../../../../shared/state/product.state';
import { ProductComponent } from '../product/product.component';


@Component({
    selector: 'app-four-column-product',
    templateUrl: './four-column-product.component.html',
    styleUrls: ['./four-column-product.component.scss'],
    standalone: true,
    imports: [ProductComponent]
})
export class FourColumnProductComponent {

  @Input() data?: SliderProductsTokyo;
  @Input() col: string;

  product$: Observable<ProductModel> = inject(Store).select(ProductState.product);

}
