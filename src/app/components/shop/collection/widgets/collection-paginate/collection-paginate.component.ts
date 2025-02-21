import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller, AsyncPipe } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProductModel } from '../../../../../shared/interface/product.interface';
import { Params } from '../../../../../shared/interface/core.interface';
import { ProductState } from '../../../../../shared/state/product.state';
import { PaginationComponent } from '../../../../../shared/components/widgets/pagination/pagination.component';

@Component({
    selector: 'app-collection-paginate',
    templateUrl: './collection-paginate.component.html',
    styleUrls: ['./collection-paginate.component.scss'],
    standalone: true,
    imports: [PaginationComponent, AsyncPipe]
})
export class CollectionPaginateComponent {

  product$: Observable<ProductModel> = inject(Store).select(ProductState.product);

  @Input() filter: Params;

  public totalItems: number = 0;

  constructor(private route: ActivatedRoute,
    private router: Router, private viewScroller: ViewportScroller) {
    this.product$.subscribe(product => this.totalItems = product?.total);
  }

  setPaginate(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: page
      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      // this.viewScroller.setOffset([100, 100]);
      // this.viewScroller.scrollToAnchor('filtered_products'); // Anchor Link
    });
  }

}
