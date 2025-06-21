import { Component, Input, ViewChild, PLATFORM_ID, Inject, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Store } from '@ngxs/store';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import * as data from  '../../../shared/data/owl-carousel';
import { ExitModalComponent } from '../../../shared/components/widgets/modal/exit-modal/exit-modal.component';
import { TitleComponent } from '../../../shared/components/widgets/title/title.component';
import { ProductComponent } from '../widgets/product/product.component';
import { CategoriesComponent } from '../widgets/categories/categories.component';
import { BannerComponent } from '../widgets/banner/banner.component';
import { HomeBannerComponent } from '../widgets/home-banner/home-banner.component';
import { HomeData } from 'src/app/shared/interface/account.interface';
import { HomeState } from 'src/app/shared/state/home.state';
import { Observable} from 'rxjs';

@Component({
    selector: 'app-paris',
    templateUrl: './paris.component.html',
    styleUrls: ['./paris.component.scss'],
    standalone: true,
    imports: [HomeBannerComponent, BannerComponent, CategoriesComponent, 
      ProductComponent, TitleComponent]
})
export class ParisComponent {

  @Input() slug?: string;
  @Input() data?: HomeData;

  @ViewChild("exitModal") ExitModal: ExitModalComponent;
  data$: Observable<HomeData[]> = inject(Store).select(HomeState.homeData) as Observable<HomeData[]>;

  public categorySlider = data.categorySlider;
  public isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private themeOptionService: ThemeOptionService) {     
      this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    
      this.themeOptionService.preloader = false;
      this.themeOptionService.theme_color = '#0da487';
    }

  ngOnDestroy() {
    if (this.isBrowser) {  
      // Remove Color
      document.documentElement.style.removeProperty('--theme-color');
    }
  }
}
