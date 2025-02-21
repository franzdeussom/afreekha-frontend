import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { QuestionAnswersState } from '../../../../../../shared/state/questions-answers.state';
import { QnAModel } from '../../../../../../shared/interface/questions-answers.interface';
import { GetQuestionAnswers } from '../../../../../../shared/action/questions-answers.action';
import { GetReview } from '../../../../../../shared/action/review.action';
import { ReviewState } from '../../../../../../shared/state/review.state';
import { ReviewModel } from '../../../../../../shared/interface/review.interface';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe } from '@angular/common';
import { QuestionsAnswersComponent } from '../questions-answers/questions-answers.component';
import { ProductReviewComponent } from '../product-review/product-review.component';
import { NgbAccordionDirective, NgbAccordionItem, NgbAccordionHeader, NgbAccordionToggle, NgbAccordionButton, NgbCollapse, NgbAccordionCollapse, NgbAccordionBody } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-product-details-accordion',
    templateUrl: './product-details-accordion.component.html',
    styleUrls: ['./product-details-accordion.component.scss'],
    standalone: true,
    imports: [NgbAccordionDirective, NgbAccordionItem, NgbAccordionHeader, NgbAccordionToggle, NgbAccordionButton, NgbCollapse, NgbAccordionCollapse, NgbAccordionBody, ProductReviewComponent, QuestionsAnswersComponent, AsyncPipe, TranslateModule]
})
export class ProductDetailsAccordionComponent {

  @Input() product: Product | null;

  question$: Observable<QnAModel> = inject(Store).select(QuestionAnswersState.questionsAnswers);
  review$: Observable<ReviewModel> = inject(Store).select(ReviewState.review);

  constructor(private store: Store){}

  ngOnChanges(changes: SimpleChanges) {
    let product = changes['product']?.currentValue;
    this.store.dispatch(new GetQuestionAnswers({product_id: product.id}));
    this.store.dispatch(new GetReview({product_id: product.id}));
  }
}
