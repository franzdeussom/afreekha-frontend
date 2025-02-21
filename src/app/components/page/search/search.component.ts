import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { GetProducts } from '../../../shared/action/product.action';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { ProductBoxComponent } from '../../../shared/components/widgets/product-box/product-box.component';
import { SkeletonProductBoxComponent } from '../../../shared/components/widgets/product-box/skeleton-product-box/skeleton-product-box.component';
import * as data from '../../../shared/data/owl-carousel';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { Params } from '../../../shared/interface/core.interface';
import { Product, ProductModel } from '../../../shared/interface/product.interface';
import { ProductState } from '../../../shared/state/product.state';
import { ProductService } from './../../../shared/services/product.service';

import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    standalone: true,
    imports: [BreadcrumbComponent, ReactiveFormsModule, ButtonComponent, SkeletonProductBoxComponent, ProductBoxComponent, NoDataComponent, TranslateModule]
})
export class SearchComponent {

  public breadcrumb: Breadcrumb = {
    title: "Search",
    items: [{ label: "Search", active: true }]
  }

  product$: Observable<ProductModel> = inject(Store).select(ProductState.product);

  public products: Product[];
  public search = new FormControl();
  public totalItems: number = 0;
  public gridClass: string = "row g-sm-4 g-3 row-cols-2 row-cols-md-3 cols-lg-4 row-cols-xxl-6 product-list-section";
  public skeletonItems = Array.from({ length: 12 }, (_, index) => index);
  public productSlider6ItemMargin = data.productSlider6ItemMargin;
  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 200, // Display per page,
    'status': 1,
    'search': ''
  }

  constructor(private store: Store, public productService: ProductService, private route: ActivatedRoute, public router: Router){
  //  this.getProduct(this.filter);

   this.route.queryParams.subscribe(params => {
    if(params['search']) {
      this.filter['search'] = params['search'];
      this.search.patchValue(params['search'] ? params['search'] : '')
    }
    this.store.dispatch(new GetProducts(this.filter)).subscribe({
      next: (val:any) =>{
        this.products = val.product.product.data
      }
    });
   });
  }

  ngOnInit(){
    this.search.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()) // Adjust the debounce time as needed (in milliseconds)
      .subscribe((inputValue) => {
      if(inputValue.length == 0){
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            search: inputValue
          }
        });
        this.filter['search'] = inputValue;
      }
    });
  }

  searchProduct(){
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.search.value
      }
    });
    this.filter['search'] = this.search.value;
  }

}
