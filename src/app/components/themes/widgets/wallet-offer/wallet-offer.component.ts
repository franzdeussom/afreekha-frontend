import { Component, Input } from '@angular/core';
import * as data from '../../../../shared/data/owl-carousel';
import { Offer } from '../../../../shared/interface/theme.interface';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../../shared/components/widgets/button/button.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-wallet-offer',
    templateUrl: './wallet-offer.component.html',
    styleUrls: ['./wallet-offer.component.scss'],
    standalone: true,
    imports: [CarouselModule, ReactiveFormsModule, FormsModule, ButtonComponent, TranslateModule]
})
export class WalletOfferComponent {

  @Input() offers: Offer[];

  public customOptionsItem3 = data.customOptionsItem3;

  copyFunction(txt:string){
    navigator.clipboard.writeText(txt);
  }
}
