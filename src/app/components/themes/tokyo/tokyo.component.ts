import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Store  } from '@ngxs/store';
import { forkJoin } from 'rxjs';
import { GetProducts } from '../../../shared/action/product.action';
import { Tokyo } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import * as data from  '../../../shared/data/owl-carousel';
import { NewsletterComponent } from '../widgets/newsletter/newsletter.component';
import { FourColumnProductComponent } from '../widgets/four-column-product/four-column-product.component';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { ProductComponent } from '../widgets/product/product.component';
import { TitleComponent } from '../../../shared/components/widgets/title/title.component';
import { BannerComponent } from '../widgets/banner/banner.component';
import { CategoriesComponent } from '../widgets/categories/categories.component';
import { HomeBannerComponent } from '../widgets/home-banner/home-banner.component';

@Component({
    selector: 'app-tokyo',
    templateUrl: './tokyo.component.html',
    styleUrls: ['./tokyo.component.scss'],
    standalone: true,
    imports: [HomeBannerComponent, CategoriesComponent, BannerComponent, TitleComponent, ProductComponent, ImageLinkComponent, FourColumnProductComponent, NewsletterComponent]
})
export class TokyoComponent {

  @Input() data?: Tokyo;
  @Input() slug?: string;

  public productSlider = data.productSlider2;
  public categorySlider = data.categorySlider9;

  constructor(private store: Store,
    @Inject(PLATFORM_ID) private platformId: Object,
    private themeOptionService: ThemeOptionService) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {  
      if(this.data?.slug == this.slug) {
        // Get Products
        const getProducts$ = this.store.dispatch(new GetProducts({
          status: 1,
          ids: this.data?.content?.products_ids?.join(',')
        }));

        // Skeleton Loader
        document.body.classList.add('skeleton-body');

        forkJoin([getProducts$]).subscribe({
          complete: () => {
            document.body.classList.remove('skeleton-body');
            this.themeOptionService.preloader = false;
          }
        });
      }

      // Change color for this layout
      document.documentElement.style.setProperty('--theme-color', '#d99f46');
      this.themeOptionService.theme_color = '#d99f46';
    }
  }

  ngAfterViewChecked() {
    if (isPlatformBrowser(this.platformId)) {  
      // Add Topbar Dark Class
      document.querySelector('.header-top')?.classList.add('bg-dark');
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {  
      // Remove Color
      document.documentElement.style.removeProperty('--theme-color');

      // Remove Topbar Dark Class for this theme only
      document.querySelector('.header-top')?.classList.remove('bg-dark');
    }

  }

}
