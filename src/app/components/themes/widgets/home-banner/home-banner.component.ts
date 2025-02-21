import { Component, Input } from '@angular/core';
import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';


@Component({
    selector: 'app-theme-home-banner',
    templateUrl: './home-banner.component.html',
    styleUrls: ['./home-banner.component.scss'],
    standalone: true,
    imports: [ImageLinkComponent]
})
export class HomeBannerComponent {

  @Input() theme: string = 'paris';
  @Input() data: any;
  
}
