import { Component, Input } from '@angular/core';
import * as data from '../../../../shared/data/owl-carousel';
import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';
import { CarouselModule } from 'ngx-owl-carousel-o';


@Component({
    selector: 'app-theme-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss'],
    standalone: true,
    imports: [CarouselModule, ImageLinkComponent]
})
export class BannerComponent {

  @Input() style: string = 'horizontal';
  @Input() class: string | null;
  @Input() contentClass: string;
  @Input() banners: any;

  public bannerSlider = data.bannerSlider;

}
