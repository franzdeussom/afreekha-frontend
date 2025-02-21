import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { PageState } from '../../../shared/state/page.state';
import { GetFaqs } from '../../../shared/action/page.action';
import { FaqModel } from '../../../shared/interface/page.interface';
import { PageService } from '../../../shared/services/page.service';
import { NgbAccordionDirective, NgbAccordionItem, NgbAccordionHeader, NgbAccordionToggle, NgbAccordionButton, NgbCollapse, NgbAccordionCollapse, NgbAccordionBody } from '@ng-bootstrap/ng-bootstrap';
import { SkeletonPageComponent } from '../skeleton-page/skeleton-page.component';
import { AsyncPipe } from '@angular/common';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss'],
    standalone: true,
    imports: [BreadcrumbComponent, SkeletonPageComponent, NgbAccordionDirective, NgbAccordionItem, NgbAccordionHeader, NgbAccordionToggle, NgbAccordionButton, NgbCollapse, NgbAccordionCollapse, NgbAccordionBody, AsyncPipe]
})
export class FaqComponent {

  public breadcrumb: Breadcrumb = {
    title: "FAQ's",
    items: [{ label: "FAQ's", active: true }]
  }

  faq$: Observable<FaqModel> = inject(Store).select(PageState.faq);

  constructor(private store: Store, public pageService: PageService) {
    this.store.dispatch(new GetFaqs());
  }

}
