import { Component, Input, ViewChild, PLATFORM_ID, Inject, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
import { DealComponent } from 'src/app/shared/components/header/widgets/deal/deal.component';
import { Product } from 'src/app/shared/interface/product.interface';
import { ProductState } from 'src/app/shared/state/product.state';
import { RouterLink } from '@angular/router';
import { CurrencySymbolPipe } from 'src/app/shared/pipe/currency-symbol.pipe';
import { BrandsComponent } from 'src/app/shared/components/widgets/brands/brands.component';
import { MoreServiceComponent } from 'src/app/shared/components/widgets/moreService/moreService.component';
import { TimerComponent } from '../../timer/timer.component';
import { AboutmeComponent } from '../../aboutme/aboutme.component';
import {Breakpoints, BreakpointObserver} from "@angular/cdk/layout";
@Component({
    selector: 'app-paris',
    templateUrl: './paris.component.html',
    styleUrls: ['./paris.component.scss'],
    standalone: true,
    imports: [HomeBannerComponent, BannerComponent, CategoriesComponent,MoreServiceComponent,CommonModule,
      ProductComponent, TitleComponent, BrandsComponent, TimerComponent, AboutmeComponent]
})
export class ParisComponent {
  isMobile : boolean= false

  @Input() slug?: string;
  @Input() data?: HomeData;

  @ViewChild("exitModal") ExitModal: ExitModalComponent;
  data$: Observable<HomeData[]> = inject(Store).select(HomeState.homeData) as Observable<HomeData[]>;

  public categorySlider = data.categorySlider;
  public isBrowser: boolean;
  dealProducts$: Observable<Product[]> = inject(Store).select(ProductState.dealProducts) as Observable<Product[]>;
  products : Product[] = [];
  constructor(private beakpointObserver: BreakpointObserver,
    @Inject(PLATFORM_ID) private platformId: Object,
    private themeOptionService: ThemeOptionService, private store: Store) {     
      this.isBrowser = isPlatformBrowser(this.platformId);
      this.beakpointObserver.observe([Breakpoints.Handset]).subscribe(
        res=>{
          this.isMobile = res.matches
          // console.log('mobile value:', this.isMobile,"mathes:",res.matches)
        }
      )
  }

  ngOnInit() {
    
      this.themeOptionService.preloader = false;
      this.themeOptionService.theme_color = '#0da487';
      this.dealProducts$.subscribe((val)=>{
              this.products = this.store.selectSnapshot(ProductState.dealProducts) as Product[];
      })
    }

  ngOnDestroy() {
    if (this.isBrowser) {  
      // Remove Color
      document.documentElement.style.removeProperty('--theme-color');
    }
  }
}
