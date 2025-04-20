import { Component, inject } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { OrderState } from '../../../shared/state/order.state';
import { GetOrders } from '../../../shared/action/order.action';
import { OrderModel } from '../../../shared/interface/order.interface';
import { Params } from '../../../shared/interface/core.interface';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../shared/pipe/currency-symbol.pipe';
import { TitleCasePipe } from '../../../shared/pipe/title-case.pipe';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { PaginationComponent } from '../../../shared/components/widgets/pagination/pagination.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe } from '@angular/common';
import { AccountState } from 'src/app/shared/state/account.state';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
    standalone: true,
    providers:[CurrencySymbolPipe],
    imports: [RouterLink, PaginationComponent, NoDataComponent, 
      AsyncPipe, DatePipe, TitleCasePipe, CurrencySymbolPipe, TranslateModule]
})
export class OrdersComponent {


  order$: Observable<OrderModel> = inject(Store).select(OrderState.order) as Observable<OrderModel>;
  user: any;
  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 10, // Display per page,
  };

  constructor(private store: Store) {
    this.user = this.store.selectSnapshot(AccountState.user);
    if(this.user?.user.id){
        this.store.dispatch(new GetOrders(this.user?.user.id));
    }
  }

  setPaginate(page: number) {
    this.filter['page'] = page;
    this.store.dispatch(new GetOrders(this.user.user.id));
  }

}
