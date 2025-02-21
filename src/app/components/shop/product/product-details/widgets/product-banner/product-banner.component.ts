import { Component, Input, SimpleChanges } from '@angular/core';
import { Link } from '../../../../../../shared/interface/theme.interface';
import { ImageLinkComponent } from '../../../../../../shared/components/widgets/image-link/image-link.component';

@Component({
    selector: 'app-product-banner',
    templateUrl: './product-banner.component.html',
    styleUrls: ['./product-banner.component.scss'],
    standalone: true,
    imports: [ImageLinkComponent]
})
export class ProductBannerComponent {

  @Input() image: string | null;

  public banner: Link

  ngOnChanges(change: SimpleChanges){
    let img = change['image'].currentValue
    this.banner = {
      redirect_link: {
        link_type: 'collection',
        link: 'vegetables-fruits'
      },
      image_url: img
    }
  }
}
