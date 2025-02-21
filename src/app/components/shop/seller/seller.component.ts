import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { Option, Seller } from '../../../shared/interface/theme-option.interface';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-seller',
    templateUrl: './seller.component.html',
    styleUrls: ['./seller.component.scss'],
    standalone: true,
    imports: [BreadcrumbComponent, ReactiveFormsModule, FormsModule, TranslateModule]
})
export class SellerComponent {

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as  Observable<Option>

  public breadcrumb: Breadcrumb = {
    title: "Become Seller",
    items: [{ label: 'Become Seller', active: true }]
  }

  public seller: Seller;

  constructor(){
    this.themeOption$.subscribe(data => this.seller = data && data.seller);
  }

}
