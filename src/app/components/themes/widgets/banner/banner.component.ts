import { Component, Input } from '@angular/core';
import * as data from '../../../../shared/data/owl-carousel';
import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Product } from 'src/app/shared/interface/product.interface';
import { ProductComponent } from '../product/product.component';


@Component({
    selector: 'app-theme-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss'],
    standalone: true,
    imports: [CarouselModule, ImageLinkComponent, ProductComponent]
})
export class BannerComponent {

  @Input() style: string = 'horizontal';
  @Input() isBaner: boolean = false;
  @Input() class: string | null;
  @Input() contentClass: string;
  @Input() banners: any;
  @Input() articles: Product[] = [];
  
  public bannerSlider = data.bannerSlider;


}
