import { Component, inject, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from '../../../../../../shared/interface/product.interface';
import { ProductState } from '../../../../../../shared/state/product.state';
import { Cart, CartAddOrUpdate } from '../../../../../../shared/interface/cart.interface';
import { AddToCart } from '../../../../../../shared/action/cart.action';
import { CartState } from '../../../../../../shared/state/cart.state';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../../../../shared/pipe/currency-symbol.pipe';
import { ButtonComponent } from '../../../../../../shared/components/widgets/button/button.component';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-product-bundle',
    templateUrl: './product-bundle.component.html',
    styleUrls: ['./product-bundle.component.scss'],
    standalone: true,
    providers:[CurrencySymbolPipe],
    imports: [RouterLink, ButtonComponent, CurrencySymbolPipe, TranslateModule]
})
export class ProductBundleComponent {

  crossSellproduct$: Observable<Product[]> = inject(Store).select(ProductState.relatedProducts);
  cartItem$: Observable<Cart[]> = inject(Store).select(CartState.cartItems);

  @Input() product: Product | null;

  public cartItem: Cart | null;

  public crossSellproducts: Product[] = [];
  public selectedProduct: Product[] = [];
  public selectedProductIds: number[] = [];

  public total: number = 0;

  constructor(private store: Store) {}

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.product?.cross_sell_products && Array.isArray(this.product?.cross_sell_products)) {
      this.crossSellproduct$.subscribe(products => {
        this.crossSellproducts = products.filter(product => this.product?.cross_sell_products?.includes(product?.id!));
      });
    }
  }

  select(event: Event) {
    const index = this.selectedProductIds.indexOf(Number((<HTMLInputElement>event?.target)?.value));  // checked and unchecked value
    if ((<HTMLInputElement>event?.target)?.checked)   
      this.selectedProductIds.push(Number((<HTMLInputElement>event?.target)?.value)); // push in array cheked value
    else 
      this.selectedProductIds.splice(index, 1);  // removed in array unchecked value 
      
    this.crossSellproduct$.subscribe(products => {
      this.selectedProduct = products.filter(product => this.selectedProductIds?.includes(product?.id!));
    });
 
    this.total = this.selectedProduct.reduce((sum, item) => sum + item.sale_price, 0);
  }

  addToCartAll() {
    this.selectedProduct.forEach(product => {
      if(product) {
        this.cartItem$.subscribe(items => {
          this.cartItem = items.find(item => item.product.id == product.id)!;
        });
        const params: CartAddOrUpdate = {
          id: this.cartItem ? this.cartItem.id : null,
          product_id: product?.id!,
          product: product ? product : null,
          variation: null,
          variation_id: null,
          quantity: 1
        }
        this.store.dispatch(new AddToCart(params));
      }
    });
  }

}
