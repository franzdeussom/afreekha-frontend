import { Component, inject } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { WalletState } from '../../../shared/state/wallet.state';
import { GetUserTransaction } from '../../../shared/action/wallet.action';
import { Wallet } from '../../../shared/interface/wallet.interface';
import { Params } from '../../../shared/interface/core.interface';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../shared/pipe/currency-symbol.pipe';
import { TitleCasePipe } from '../../../shared/pipe/title-case.pipe';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { PaginationComponent } from '../../../shared/components/widgets/pagination/pagination.component';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'app-wallet',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.scss'],
    standalone: true,
    providers:[CurrencySymbolPipe],
    imports: [PaginationComponent, NoDataComponent, AsyncPipe, DatePipe, TitleCasePipe, CurrencySymbolPipe, TranslateModule]
})
export class WalletComponent {

  wallet$: Observable<Wallet> = inject(Store).select(WalletState.wallet) as Observable<Wallet>;

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
