import { Component, inject, Input, SimpleChange } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Params } from '../../../../shared/interface/core.interface';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { ThemeOptionState } from '../../../../shared/state/theme-option.state';
import { AttributeService } from '../../../../shared/services/attribute.service';
import { CollectionProductsComponent } from '../widgets/collection-products/collection-products.component';
import { BannerComponent } from '../widgets/banner/banner.component';

@Component({
    selector: 'app-collection-no-sidebar',
    templateUrl: './collection-no-sidebar.component.html',
    styleUrls: ['./collection-no-sidebar.component.scss'],
    standalone: true,
    imports: [BannerComponent, CollectionProductsComponent]
})
export class CollectionNoSidebarComponent {

  themeOptions$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  @Input() filter: Params;

  public bannerImageUrl: string;

  constructor(public attributeService: AttributeService) {
    this.themeOptions$.subscribe(res => this.bannerImageUrl = res?.collection?.collection_banner_image_url)
  }

}
