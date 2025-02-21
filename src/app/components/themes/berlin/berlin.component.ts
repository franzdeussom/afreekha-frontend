import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Store  } from '@ngxs/store';
import { forkJoin } from 'rxjs';
import { GetProducts } from '../../../shared/action/product.action';
import { Berlin } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import * as data from  '../../../shared/data/owl-carousel';
import { NewsletterComponent } from '../widgets/newsletter/newsletter.component';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { CategoriesComponent } from '../widgets/categories/categories.component';
import { ProductComponent } from '../widgets/product/product.component';
import { TitleComponent } from '../../../shared/components/widgets/title/title.component';
import { ServiceComponent } from '../widgets/service/service.component';
import { HomeBannerComponent } from '../widgets/home-banner/home-banner.component';

@Component({
    selector: 'app-berlin',
    templateUrl: './berlin.component.html',
    styleUrls: ['./berlin.component.scss'],
    standalone: true,
    imports: [HomeBannerComponent, ServiceComponent, TitleComponent, ProductComponent, CategoriesComponent, ImageLinkComponent, NewsletterComponent]
})
export class BerlinComponent {

  @Input() data?: Berlin;
  @Input() slug?: string;

  public categorySlider = data.categorySlider;
  public productSliderMargin = data.productSliderMargin;

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
      document.documentElement.style.setProperty('--theme-color', '#417394');
      this.themeOptionService.theme_color = '#417394';
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {  
      // Remove Color
      document.documentElement.style.removeProperty('--theme-color');
    }
  }

 }
