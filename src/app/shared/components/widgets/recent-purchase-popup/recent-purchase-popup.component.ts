import { Component, PLATFORM_ID, Inject, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product, ProductModel } from '../../../interface/product.interface';
import { ProductState } from '../../../state/product.state';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-recent-purchase-popup',
    templateUrl: './recent-purchase-popup.component.html',
    styleUrls: ['./recent-purchase-popup.component.scss'],
    standalone: true,
    imports: [RouterLink, TranslateModule]
})
export class RecentPurchasePopupComponent {

  relatesProduct$: Observable<Product[]> = inject(Store).select(ProductState.relatedProducts);
  product$: Observable<ProductModel> = inject(Store).select(ProductState.product);

  public product: Product | null;
  public show: boolean = false;
  public min: number = 10;
  public popup_enable: boolean = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {  
      if(this.popup_enable) {
        setInterval(() => {
          this.show = true;
          this.min = Math.floor(Math.random() * 60) + 1;
          this.randomlySelectProduct();
          setTimeout(() => {
            this.show = false;
          }, 5000);
        }, 20000);
      }
    }
  }

  randomlySelectProduct() {
    this.product$.subscribe(product => {
      if(!product.data.length) {
        this.relatesProducts();
      } else {
        const randomIndex = Math.floor(Math.random() * product.data.length);
        this.product = product.data[randomIndex];
      }
    });
  }

  relatesProducts() {
    this.relatesProduct$.subscribe(products => {
      const randomIndex = Math.floor(Math.random() * products.length);
      this.product = products[randomIndex];
    });
  }

  closePopup() {
    this.popup_enable = false;
  }
}
