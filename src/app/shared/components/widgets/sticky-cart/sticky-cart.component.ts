import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Cart } from '../../../interface/cart.interface';
import { CartState } from '../../../state/cart.state';
import { CurrencySymbolPipe } from '../../../pipe/currency-symbol.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { AsyncPipe, SlicePipe } from '@angular/common';

@Component({
    selector: 'app-sticky-cart',
    templateUrl: './sticky-cart.component.html',
    styleUrls: ['./sticky-cart.component.scss'],
    standalone: true,
    providers:[CurrencySymbolPipe],
    imports: [ButtonComponent, RouterLink, AsyncPipe, SlicePipe, TranslateModule, CurrencySymbolPipe]
})
export class StickyCartComponent {

  cartItem$: Observable<Cart[]> = inject(Store).select(CartState.cartItems);
  cartTotal$: Observable<number> = inject(Store).select(CartState.cartTotal);
  stickyCart$: Observable<boolean> = inject(Store).select(CartState.stickyCart);

  public isOpen: boolean;

  constructor() {
    this.stickyCart$.subscribe(value => this.isOpen = value);
  }

  openCart(isOpen: boolean) {
    this.isOpen = isOpen;
  }

}
