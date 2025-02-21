import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from '../../../../../../shared/interface/product.interface';
import { ProductState } from '../../../../../../shared/state/product.state';
import { ProductBoxComponent } from '../../../../../../shared/components/widgets/product-box/product-box.component';
import { TitleComponent } from '../../../../../../shared/components/widgets/title/title.component';


@Component({
    selector: 'app-related-products',
    templateUrl: './related-products.component.html',
    styleUrls: ['./related-products.component.scss'],
    standalone: true,
    imports: [TitleComponent, ProductBoxComponent]
})
export class RelatedProductsComponent {

  relatedProduct$: Observable<Product[]> = inject(Store).select(ProductState.relatedProducts);

  @Input() product: Product | null;

  public relatedproducts: Product[] = [];

  ngOnChanges() {
    if (this.product?.related_products && Array.isArray(this.product?.related_products)) {
      this.relatedProduct$.subscribe(products => {
        this.relatedproducts = products.filter(product => this.product?.related_products?.includes(product?.id));
      });
    }
  }

}
