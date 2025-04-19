import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from '../../../../../../shared/interface/product.interface';
import { ProductState } from '../../../../../../shared/state/product.state';
import { TranslateModule } from '@ngx-translate/core';
import { ProductBoxComponent } from '../../../../../../shared/components/widgets/product-box/product-box.component';
import { SlicePipe } from '@angular/common';
import { HomeState } from 'src/app/shared/state/home.state';

@Component({
    selector: 'app-trending-products',
    templateUrl: './trending-products.component.html',
    styleUrls: ['./trending-products.component.scss'],
    standalone: true,
    imports: [ProductBoxComponent, SlicePipe, TranslateModule]
})
export class TrendingProductsComponent {

  relatedProduct$: Observable<any> = inject(Store).select(HomeState.homeData) as any;

  public relatedProducts: Product[] = [];

  ngOnInit() {
    this.relatedProduct$.subscribe(products => {
      this.relatedProducts = products.secode_section ? products.secode_section.article: [];
    });
  }
}
