import { Component, Input } from '@angular/core';
import * as data from '../../../../shared/data/owl-carousel'
import { Bundles } from '../../../../shared/interface/theme.interface';
import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';

import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-theme-collection ',
    templateUrl: './collection .component.html',
    styleUrls: ['./collection .component.scss'],
    standalone: true,
    imports: [CarouselModule, ImageLinkComponent]
})
export class CollectionComponent {

  @Input() data: Bundles[];

  public bannerSlider = data.bannerSlider;

}
