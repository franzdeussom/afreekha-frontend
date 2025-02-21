import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StoreService } from '../../../../shared/services/store.service';
import { Breadcrumb } from '../../../../shared/interface/breadcrumb';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { ThemeOptionState } from '../../../../shared/state/theme-option.state';
import { StoresModel } from '../../../../shared/interface/store.interface';
import { StoreState } from '../../../../shared/state/store.state';
import { GetStores } from '../../../../shared/action/store.action';
import { GetStoreProducts } from '../../../../shared/action/product.action';
import { PaginationComponent } from '../../../../shared/components/widgets/pagination/pagination.component';
import { SellerStoreClassicComponent } from './seller-store-classic/seller-store-classic.component';
import { SellerStoreBasicComponent } from './seller-store-basic/seller-store-basic.component';
import { AsyncPipe } from '@angular/common';
import { BreadcrumbComponent } from '../../../../shared/components/widgets/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-seller-store',
    templateUrl: './seller-store.component.html',
    styleUrls: ['./seller-store.component.scss'],
    standalone: true,
    imports: [BreadcrumbComponent, SellerStoreBasicComponent, SellerStoreClassicComponent, PaginationComponent, AsyncPipe]
})
export class SellerStoreComponent {

  themeOptions$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as  Observable<Option>
  store$: Observable<StoresModel> = inject(Store).select(StoreState.store) as  Observable<StoresModel>

  public breadcrumb: Breadcrumb = {
    title: "Seller Stores",
    items: [{ label: 'Seller Stores', active: true }]
  }
  public totalItems: number = 0;
  public filter = {
    'status': 1,
    'page': 1, // Current page number
    'paginate': 9, // Display per page,
  };

  public skeletonItems = Array.from({ length: 6 }, (_, index) => index);
  public layout: string = 'basic_store';

  constructor(public store: Store, private route: ActivatedRoute,
    public storeService: StoreService){

    // Params For Demo Purpose only
    this.route.queryParams.subscribe(params => {
      this.store.dispatch(new GetStores(this.filter));
      this.store$.subscribe(store => this.totalItems = store?.total);

      if(params['layout']) {
        this.layout = params['layout'];
      } else {
        this.themeOptions$.subscribe(option => {
          this.layout = option && option.seller && option.seller.store_layout ? option.seller.store_layout : 'basic_store';
        });
      }
    });

    this.store$.subscribe(store => {
      if(store && store.data) {
        const storeIds = store?.data?.map(store => store.id);
        if(Array.isArray(storeIds) && storeIds.length) {
          this.store.dispatch(new GetStoreProducts({ status: 1, store_ids: storeIds.join(',')}));
        }
      }
    })
  }

  setPaginate(data: number) {
    this.filter.page = data;
    this.store.dispatch(new GetStores(this.filter));
  }

}
