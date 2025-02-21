import { Component, HostListener, inject, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { isPlatformBrowser, AsyncPipe } from '@angular/common';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { Product } from '../../../shared/interface/product.interface';
import { ProductState } from '../../../shared/state/product.state';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { Option } from '../../../shared/interface/theme-option.interface';
import { StickyCheckoutComponent } from './product-details/widgets/sticky-checkout/sticky-checkout.component';
import { RelatedProductsComponent } from './product-details/widgets/related-products/related-products.component';
import { ProductAccordionComponent } from './product-details/product-accordion/product-accordion.component';
import { ProductStickyComponent } from './product-details/product-sticky/product-sticky.component';
import { ProductSliderComponent } from './product-details/product-slider/product-slider.component';
import { ProductImagesComponent } from './product-details/product-images/product-images.component';
import { ProductThumbnailComponent } from './product-details/product-thumbnail/product-thumbnail.component';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    standalone: true,
    imports: [BreadcrumbComponent, ProductThumbnailComponent, ProductImagesComponent, ProductSliderComponent, ProductStickyComponent, ProductAccordionComponent, RelatedProductsComponent, StickyCheckoutComponent, AsyncPipe]
})
export class ProductComponent {

  product$: Observable<Product> = inject(Store).select(ProductState.selectedProduct) as Observable<Product>;
  themeOptions$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  public breadcrumb: Breadcrumb = {
    title: "Product",
    items: []
  }
  public layout: string = 'product_thumbnail';
  public product: Product;
  public isScrollActive = false;
  public isBrowser: boolean;

  constructor(private route: ActivatedRoute, private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.product$.subscribe(product => {
      if(product) {
        this.breadcrumb.items = [];
        this.breadcrumb.title = product.name;
        this.breadcrumb.items.push({ label: 'Product', active: true }, { label: product.name, active: false });
        this.product = product;
        product?.meta_title && this.meta.updateTag({property: 'og:title', content: product?.meta_title});
        product?.meta_description && this.meta.updateTag({property: 'og:description', content: product?.meta_description});
        product?.product_meta_image && this.meta.updateTag({property: 'og:image', content: product?.product_meta_image.original_url});
        product?.product_meta_image && this.meta.updateTag({property: 'og:image:width', content: '500'});
        product?.product_meta_image && this.meta.updateTag({property: 'og:image:height', content: '500'});
      }
    });

    // For Demo Purpose only
    this.route.queryParams.subscribe(params => {
      if(params['layout']) {
        this.layout = params['layout'];
      } else {
        // Get Product Layout
        this.themeOptions$.subscribe(option => {
          this.layout = option?.product && option?.product?.product_layout ? option?.product?.product_layout : 'product_thumbnail';
        });
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (this.isBrowser) {  
      const button = document.querySelector('.scroll-button');
      if (button) {
        const buttonRect = button.getBoundingClientRect();
        if (buttonRect.bottom < window.innerHeight && buttonRect.bottom < 0) {
          this.isScrollActive = true;
          document.body.classList.add('stickyCart');
        } else {
          this.isScrollActive = false;
          document.body.classList.remove('stickyCart');
        }
      }
    }
  }

  ngOnDestroy(){
    if (this.isBrowser) {
      document.body.classList.remove('stickyCart')
    }
  }

}
