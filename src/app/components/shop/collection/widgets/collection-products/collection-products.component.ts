import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProductService } from '../../../../../shared/services/product.service';
import { ProductModel } from '../../../../../shared/interface/product.interface';
import { ProductState } from '../../../../../shared/state/product.state';
import { Params } from '../../../../../shared/interface/core.interface';
import { CollectionPaginateComponent } from '../collection-paginate/collection-paginate.component';
import { NoDataComponent } from '../../../../../shared/components/widgets/no-data/no-data.component';
import { ProductBoxComponent } from '../../../../../shared/components/widgets/product-box/product-box.component';
import { SkeletonProductBoxComponent } from '../../../../../shared/components/widgets/product-box/skeleton-product-box/skeleton-product-box.component';
import { AsyncPipe } from '@angular/common';
import { CollectionSortComponent } from '../collection-sort/collection-sort.component';

@Component({
    selector: 'app-collection-products',
    templateUrl: './collection-products.component.html',
    styleUrls: ['./collection-products.component.scss'],
    standalone: true,
    imports: [CollectionSortComponent, SkeletonProductBoxComponent, ProductBoxComponent, NoDataComponent, CollectionPaginateComponent, AsyncPipe]
})
export class CollectionProductsComponent {

  product$: Observable<ProductModel> = inject(Store).select(ProductState.product);

  @Input() filter: Params;
  @Input() gridCol: string;

  public gridClass: string = "row g-sm-4 g-3 row-cols-xxl-4 row-cols-xl-3 row-cols-lg-2 row-cols-md-3 row-cols-2 product-list-section";

  public skeletonItems = Array.from({ length: 40 }, (_, index) => index);

  constructor(public productService: ProductService) {
  }

  setGridClass(gridClass: string) {
    this.gridClass = gridClass;
  }
}
