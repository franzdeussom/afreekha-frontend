import { Component, inject, Input } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AttributeService } from '../../../../../shared/services/attribute.service';
import { Params } from '../../../../../shared/interface/core.interface';
import { AttributeModel } from '../../../../../shared/interface/attribute.interface';
import { AttributeState } from '../../../../../shared/state/attribute.state';
import { GetAttributes } from '../../../../../shared/action/attribute.action';
import { TranslateModule } from '@ngx-translate/core';
import { CollectionRatingFilterComponent } from '../filter/collection-rating-filter/collection-rating-filter.component';
import { CollectionPriceFilterComponent } from '../filter/collection-price-filter/collection-price-filter.component';
import { CollectionAttributesComponent } from '../filter/collection-attributes-filter/collection-attributes-filter.component';
import { CollectionCategoryFilterComponent } from '../filter/collection-category-filter/collection-category-filter.component';
import { NgbAccordionDirective, NgbAccordionItem, NgbAccordionHeader, NgbAccordionToggle, NgbAccordionButton, NgbCollapse, NgbAccordionCollapse, NgbAccordionBody } from '@ng-bootstrap/ng-bootstrap';
import { SkeletonCollectionSidebarComponent } from '../skeleton-collection-sidebar/skeleton-collection-sidebar.component';
import { AsyncPipe } from '@angular/common';
import { CollectionFilterComponent } from '../filter/collection-filter/collection-filter.component';

@Component({
    selector: 'app-collection-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: true,
    imports: [CollectionFilterComponent, SkeletonCollectionSidebarComponent, NgbAccordionDirective, NgbAccordionItem, NgbAccordionHeader, NgbAccordionToggle, NgbAccordionButton, NgbCollapse, NgbAccordionCollapse, NgbAccordionBody, CollectionCategoryFilterComponent, CollectionAttributesComponent, CollectionPriceFilterComponent, CollectionRatingFilterComponent, AsyncPipe, TranslateModule]
})
export class CollectionSidebarComponent {

  @Input() filter: Params;

  attribute$: Observable<AttributeModel> = inject(Store).select(AttributeState.attribute);

  constructor(private store: Store,
    public attributeService: AttributeService) {
    this.store.dispatch(new GetAttributes({ status: 1}));
  }

  closeCanvasMenu() {
    this.attributeService.offCanvasMenu = false;
  }

}
