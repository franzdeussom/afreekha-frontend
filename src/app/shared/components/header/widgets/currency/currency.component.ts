import { Component, Input, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, AsyncPipe } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Currency, CurrencyModel } from '../../../../../shared/interface/currency.interface';
import { CurrencyState } from '../../../../../shared/state/currency.state';
import { SettingState } from '../../../../../shared/state/setting.state';
import { Values } from '../../../../../shared/interface/setting.interface';
import { SelectedCurrency } from '../../../../../shared/action/setting.action';
import { ButtonComponent } from '../../../widgets/button/button.component';
import { ClickOutsideDirective } from '../../../../directive/out-side-directive';

@Component({
    selector: 'app-currency',
    templateUrl: './currency.component.html',
    styleUrls: ['./currency.component.scss'],
    standalone: true,
    imports: [ClickOutsideDirective, ButtonComponent, AsyncPipe]
})
export class CurrencyComponent {

  setting$: Observable<Values> = inject(Store).select(SettingState.setting) as Observable<Values>;
  selectedCurrency$: Observable<Currency> = inject(Store).select(SettingState.selectedCurrency) as Observable<Currency>;

  public open: boolean = false;
  public selectedCurrency: Currency;
  public setting: Values;

  @Input() style: string = 'basic';

  currency$: Observable<CurrencyModel> = inject(Store).select(CurrencyState.currency) as Observable<CurrencyModel>;

  constructor(private store: Store, @Inject(PLATFORM_ID) private platformId: Object) {
    this.selectedCurrency$.subscribe(setting => this.selectedCurrency = setting);
  }

  openDropDown(){
    this.open = !this.open;
  }

  selectCurrency(currency: Currency){
    this.selectedCurrency = currency;
    this.open = false;
    this.store.dispatch(new SelectedCurrency(currency)).subscribe({
      complete: () => {
        if (isPlatformBrowser(this.platformId)) {  
          window.location.reload();
        }
      }
    });
  }

  hideDropdown(){
    this.open = false;
  }
}
