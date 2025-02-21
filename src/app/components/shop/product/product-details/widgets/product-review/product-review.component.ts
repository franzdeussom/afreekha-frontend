import { Component, Input, ViewChild } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { ReviewModalComponent } from '../../../../../../shared/components/widgets/modal/review-modal/review-modal.component';
import { Review } from '../../../../../../shared/interface/review.interface';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataComponent } from '../../../../../../shared/components/widgets/no-data/no-data.component';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { ButtonComponent } from '../../../../../../shared/components/widgets/button/button.component';
import { NgStyle, DatePipe } from '@angular/common';

@Component({
    selector: 'app-product-review',
    templateUrl: './product-review.component.html',
    styleUrls: ['./product-review.component.scss'],
    standalone: true,
    imports: [NgStyle, ButtonComponent, NgbRating, NoDataComponent, ReviewModalComponent, DatePipe, TranslateModule]
})
export class ProductReviewComponent {

  @Input() product: Product | null;
  @Input() reviews: Review[] = [];

  @ViewChild("reviewModal") ProfileModal: ReviewModalComponent;

}
