import { Component, Input, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Option } from '../../../interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';
import { DealComponent } from '../widgets/deal/deal.component';
import { CallComponent } from '../widgets/call/call.component';
import { MenuComponent } from '../../widgets/menu/menu.component';
import { ButtonComponent } from '../../widgets/button/button.component';
import { CategoriesBlockComponent } from '../widgets/categories/categories.component';
import { CartComponent } from '../widgets/cart/cart.component';
import { WishlistComponent } from '../widgets/wishlist/wishlist.component';
import { CompareComponent } from '../widgets/compare/compare.component';
import { SearchBoxComponent } from '../widgets/search-box/search-box.component';
import { MyAccountComponent } from '../widgets/my-account/my-account.component';
import { SearchComponent } from '../widgets/search/search.component';
import { LogoComponent } from '../widgets/logo/logo.component';
import { NavbarMenuButtonComponent } from '../widgets/navbar-menu-button/navbar-menu-button.component';
import { TopbarComponent } from '../widgets/topbar/topbar.component';

@Component({
    selector: 'app-standard-header',
    templateUrl: './standard-header.component.html',
    styleUrls: ['./standard-header.component.scss'],
    standalone: true,
    imports: [TopbarComponent, NavbarMenuButtonComponent, LogoComponent, 
      SearchComponent, MyAccountComponent, SearchBoxComponent, CompareComponent, 
      WishlistComponent, CartComponent, CategoriesBlockComponent, ButtonComponent, 
      MenuComponent, CallComponent, DealComponent, TranslateModule]
})

export class StandardHeaderComponent {

  @Input() data: Option | null;
  @Input() logo: string | null | undefined;
  @Input() sticky: boolean | number | undefined; // Default false

  public stick: boolean = false;
  public active: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {  
      let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (number >= 150 && window.innerWidth > 400) {
        this.stick = true;
      } else {
        this.stick = false;
      }
    }
  }

  toggle(val: boolean){
    this.active = val;
  }
}
