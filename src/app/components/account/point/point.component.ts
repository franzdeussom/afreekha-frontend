import { Component, inject } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SettingState } from '../../../shared/state/setting.state';
import { PointState } from '../../../shared/state/point.state';
import { GetUserTransaction } from '../../../shared/action/point.action';
import { Point } from '../../../shared/interface/point.interface';
import { Params } from '../../../shared/interface/core.interface';
import { Values } from '../../../shared/interface/setting.interface';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../shared/pipe/currency-symbol.pipe';
import { TitleCasePipe } from '../../../shared/pipe/title-case.pipe';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { PaginationComponent } from '../../../shared/components/widgets/pagination/pagination.component';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'app-point',
    templateUrl: './point.component.html',
    styleUrls: ['./point.component.scss'],
    standalone: true,
    providers:[CurrencySymbolPipe],
    imports: [PaginationComponent, NoDataComponent, AsyncPipe, 
      DatePipe, TitleCasePipe, CurrencySymbolPipe, TranslateModule]
})
export class PointComponent {

  setting$: Observable<Values> = inject(Store).select(SettingState.setting) as Observable<Values>;
  point$: Observable<Point> = inject(Store).select(PointState.point) as Observable<Point>;

  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 10, // Display per page,
  };

  constructor(private store: Store) {
    this.store.dispatch(new GetUserTransaction(this.filter));
  }

  setPaginate(page: number) {
    this.filter['page'] = page;
    this.store.dispatch(new GetUserTransaction(this.filter));
  }

}
