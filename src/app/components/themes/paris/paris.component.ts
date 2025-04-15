import { Component, Input, ViewChild, PLATFORM_ID, Inject, inject } from '@angular/core';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import * as data from  '../../../shared/data/owl-carousel';
import { NewsletterModalComponent } from '../../../shared/components/widgets/modal/newsletter-modal/newsletter-modal.component';
import { ExitModalComponent } from '../../../shared/components/widgets/modal/exit-modal/exit-modal.component';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { TitleComponent } from '../../../shared/components/widgets/title/title.component';
import { ProductComponent } from '../widgets/product/product.component';
import { CategoriesComponent } from '../widgets/categories/categories.component';
import { BannerComponent } from '../widgets/banner/banner.component';
import { HomeBannerComponent } from '../widgets/home-banner/home-banner.component';
import { HomeData } from 'src/app/shared/interface/account.interface';
import { HomeState } from 'src/app/shared/state/home.state';
import { GetHomeData } from 'src/app/shared/action/home.action';
import { forkJoin, Observable, tap } from 'rxjs';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
    selector: 'app-paris',
    templateUrl: './paris.component.html',
    styleUrls: ['./paris.component.scss'],
    standalone: true,
    imports: [HomeBannerComponent, BannerComponent, CategoriesComponent, 
      ProductComponent, TitleComponent, ImageLinkComponent]
})
export class ParisComponent {

  @Input() slug?: string;
  @Input() data?: HomeData;

  @ViewChild("newsletterModal") NewsletterModal: NewsletterModalComponent;
  @ViewChild("exitModal") ExitModal: ExitModalComponent;
  data$: Observable<HomeData[]> = inject(Store).select(HomeState.homeData) as Observable<HomeData[]>;

  public categorySlider = data.categorySlider;
  public isBrowser: boolean;

  constructor(private store: Store,
    @Inject(PLATFORM_ID) private platformId: Object,
    private homeService : AccountService,
    private themeOptionService: ThemeOptionService) {     
      this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {  
        // Skeleton Loader
        //document.body.classList.add('skeleton-body');

      /*  forkJoin([getProducts$]).subscribe({
          complete: () => {
            document.body.classList.remove('skeleton-body');
            this.themeOptionService.preloader = false;
          }
        });*/
      }

      
      // Change color for this layout
      this.themeOptionService.preloader = false;
     // document.documentElement.style.setProperty('--theme-color','#0da487');
      this.themeOptionService.theme_color = '#0da487';
    }

  ngOnDestroy() {
    if (this.isBrowser) {  
      // Remove Color
      document.documentElement.style.removeProperty('--theme-color');
    }
  }
}
