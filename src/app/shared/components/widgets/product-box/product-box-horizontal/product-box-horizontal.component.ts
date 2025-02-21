import { Component, inject, Input, ViewChild } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { NgbRatingConfig, NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ProductDetailModalComponent } from '../../../widgets/modal/product-detail-modal/product-detail-modal.component';
import { Product } from '../../../../../shared/interface/product.interface';
import { CartAddOrUpdate, Cart } from '../../../../../shared/interface/cart.interface';
import { AddToWishlist, DeleteWishlist } from '../../../../../shared/action/wishlist.action';
import { AddToCompare } from '../../../../../shared/action/compare.action';
import { AddToCart } from '../../../../../shared/action/cart.action';
import { CartState } from '../../../../../shared/state/cart.state';
import { VariationModalComponent } from '../../modal/variation-modal/variation-modal.component';
import { CurrencySymbolPipe } from '../../../../pipe/currency-symbol.pipe';
import { TitleCasePipe } from '../../../../pipe/title-case.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { ProductDetailModalComponent as ProductDetailModalComponent_1 } from '../../modal/product-detail-modal/product-detail-modal.component';
import { ButtonComponent } from '../../button/button.component';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-product-box-horizontal',
    templateUrl: './product-box-horizontal.component.html',
    styleUrls: ['./product-box-horizontal.component.scss'],
    standalone: true,
    providers:[CurrencySymbolPipe],
    imports: [RouterLink, ButtonComponent, NgbRating, 
      ProductDetailModalComponent_1, VariationModalComponent, TranslateModule, TitleCasePipe, CurrencySymbolPipe]
})
export class ProductBoxHorizontalComponent {

  @Input() product: Product;
  @Input() class: string;
  @Input() close: boolean;

  cartItem$: Observable<Cart[]> = inject(Store).select(CartState.cartItems) as Observable<Cart[]>;

  @ViewChild("productDetailModal") productDetailModal: ProductDetailModalComponent;
  @ViewChild("variationModal") VariationModal: VariationModalComponent;

  public cartItem: Cart | null;
  public currentDate: number | null;
  public saleStartDate: number | null;

  constructor(private store: Store,
    config: NgbRatingConfig) {
		config.max = 5;
		config.readonly = true;
	}

  ngOnInit() {
    this.cartItem$.subscribe(items => {
      this.cartItem = items.find(item => item.product.id == this.product.id)!;
    });
  }

  addToCart(product: Product, qty: number) {
    const params: CartAddOrUpdate = {
      id: this.cartItem ? this.cartItem.id : null,
      product: product,
      product_id: product?.id,
      variation_id: this.cartItem ? this.cartItem?.variation_id : null,
      variation: this.cartItem ? this.cartItem?.variation : null,
      quantity: qty
    }
    this.store.dispatch(new AddToCart(params));
  }

  addToWishlist(id: number){
    this.store.dispatch(new AddToWishlist({ product_id: id }));
  }

  removeWishlist(id: number){
    this.store.dispatch(new DeleteWishlist(id));
  }

  addToCompar(id: number){
    this.store.dispatch(new AddToCompare({ product_id: id }));
  }

}
