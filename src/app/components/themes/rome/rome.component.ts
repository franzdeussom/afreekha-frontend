import { Component, inject, Inject, Input, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgStyle } from '@angular/common';
import { Store, Select } from '@ngxs/store';
import { Observable, forkJoin } from 'rxjs';
import { Rome } from '../../../shared/interface/theme.interface';
import { GetProducts } from '../../../shared/action/product.action';
import { ProductState } from '../../../shared/state/product.state';
import { GetBlogs } from '../../../shared/action/blog.action';
import { ProductModel } from '../../../shared/interface/product.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import * as data from  '../../../shared/data/owl-carousel';
import { NewsletterComponent } from '../widgets/newsletter/newsletter.component';
import { BlogComponent } from '../widgets/blog/blog.component';
import { FourColumnProductComponent } from '../widgets/four-column-product/four-column-product.component';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { ProductComponent } from '../widgets/product/product.component';
import { BannerComponent } from '../widgets/banner/banner.component';
import { CategoriesComponent } from '../widgets/categories/categories.component';
import { TitleComponent } from '../../../shared/components/widgets/title/title.component';
import { HomeBannerComponent } from '../widgets/home-banner/home-banner.component';

@Component({
    selector: 'app-rome',
    templateUrl: './rome.component.html',
    styleUrls: ['./rome.component.scss'],
    standalone: true,
    imports: [NgStyle, HomeBannerComponent, TitleComponent, CategoriesComponent, BannerComponent, ProductComponent, ImageLinkComponent, FourColumnProductComponent, BlogComponent, NewsletterComponent]
})
export class RomeComponent {

  @Input() data?: Rome;
  @Input() slug?: string;

  categoryProduct$: Observable<ProductModel> = inject(Store).select(ProductState.product) as Observable<ProductModel>;

  public categorySlider = data.categorySlider9;
  public productSlider6ItemMargin = data.productSlider6ItemMargin;
  public customOptionsItem4 = data.customOptionsItem4;
  public productFilterIds: number[] = [];
  public selectedCategoryId: number;

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

        // Get Blogs
        const getBlogs$ = this.store.dispatch(new GetBlogs({
          status: 1,
          ids: this.data?.content?.featured_blogs?.blog_ids?.join(',')
        }));

        // Skeleton Loader
        document.body.classList.add('skeleton-body');

        forkJoin([getProducts$, getBlogs$]).subscribe({
          complete: () => {
            document.body.classList.remove('skeleton-body');
            this.themeOptionService.preloader = false;
          }
        });

        if(this.data?.content?.categories_products && this.data?.content?.categories_products?.category_ids.length) {
          this.selectCategory(this.data?.content?.categories_products?.category_ids[0])
        }
      }

      // Change color for this layout
      document.documentElement.style.setProperty('--theme-color', '#0baf9a');
      this.themeOptionService.theme_color = '#0baf9a';
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {  
      // Remove Color
      document.documentElement.style.removeProperty('--theme-color');
    }
  }

  selectCategory(id: number) {
    if (isPlatformBrowser(this.platformId)) {  
      this.selectedCategoryId = id;
      this.categoryProduct$.subscribe(product => {
        this.productFilterIds = product.data.filter(product => product?.categories?.map(category => category.id).includes(id))
            ?.map(product => product.id).slice(0, 5);
      });
    }
  }

}
