import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from '../../../../../../shared/interface/product.interface';
import { ProductState } from '../../../../../../shared/state/product.state';
import { TranslateModule } from '@ngx-translate/core';
import { ProductBoxComponent } from '../../../../../../shared/components/widgets/product-box/product-box.component';
import { SlicePipe } from '@angular/common';

@Component({
    selector: 'app-trending-products',
    templateUrl: './trending-products.component.html',
    styleUrls: ['./trending-products.component.scss'],
    standalone: true,
    imports: [ProductBoxComponent, SlicePipe, TranslateModule]
})
export class TrendingProductsComponent {

  relatedProduct$: Observable<Product[]> = inject(Store).select(ProductState.relatedProducts);

  public relatedProducts: Product[] = [];

  ngOnInit() {
    this.relatedProduct$.subscribe(products => {
      this.relatedProducts = products.length ? products?.filter(product => product?.is_trending) : [];
    });
  }
}
