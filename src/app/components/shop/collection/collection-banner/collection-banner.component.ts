import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Params } from '../../../../shared/interface/core.interface';
import { ThemeOptionState } from '../../../../shared/state/theme-option.state';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { AttributeService } from '../../../../shared/services/attribute.service';
import { CollectionProductsComponent } from '../widgets/collection-products/collection-products.component';
import { BannerComponent } from '../widgets/banner/banner.component';
import { CollectionSidebarComponent } from '../widgets/sidebar/sidebar.component';

@Component({
    selector: 'app-collection-banner',
    templateUrl: './collection-banner.component.html',
    styleUrls: ['./collection-banner.component.scss'],
    standalone: true,
    imports: [CollectionSidebarComponent, BannerComponent, CollectionProductsComponent]
})
export class CollectionBannerComponent {

  themeOptions$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  @Input() filter: Params;

  public bannerImageUrl: string;

  constructor(public attributeService: AttributeService) {
    this.themeOptions$.subscribe(res => this.bannerImageUrl = res?.collection?.collection_banner_image_url);
  }

}
