import { Component, inject, Input } from '@angular/core';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { Footer } from '../../../../shared/interface/theme.interface';
import { TranslateModule } from '@ngx-translate/core';
import { SocialLinksComponent } from '../widgets/social-links/social-links.component';
import { PaymentOptionsComponent } from '../widgets/payment-options/payment-options.component';
import { CopyrightComponent } from '../widgets/copyright/copyright.component';
import { ContactComponent } from '../widgets/contact/contact.component';
import { LinksComponent } from '../widgets/links/links.component';
import { FooterCategoriesComponent } from '../widgets/categories/categories.component';
import { AboutComponent } from '../widgets/about/about.component';
import { FooterLogoComponent } from '../widgets/logo/logo.component';
import { AsyncPipe, NgClass } from '@angular/common';
import { Category } from 'src/app/shared/interface/category.interface';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { CategoryState } from 'src/app/shared/state/category.state';

@Component({
    selector: 'app-basic-footer',
    templateUrl: './basic-footer.component.html',
    styleUrls: ['./basic-footer.component.scss'],
    standalone: true,
    imports: [NgClass, FooterLogoComponent, AboutComponent, FooterCategoriesComponent, 
      LinksComponent, ContactComponent, CopyrightComponent, PaymentOptionsComponent,
      SocialLinksComponent, TranslateModule]
})
export class BasicFooterComponent {

  @Input() data: Option | null;
  @Input() footer: Footer;
  @Input() categories: {data: any[]};
 
  public active: { [key: string]: boolean } = {
    categories: false,
    useful_link: false,
    help_center: false,
  };

  toggle(value: string){
    this.active[value] = !this.active[value];
  }
}
