import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { CompareState } from '../../../shared/state/compare.state';
import { DeleteCompare, GetCompare } from '../../../shared/action/compare.action';
import { Product } from '../../../shared/interface/product.interface';
import { CompareService } from '../../../shared/services/compare.service';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../shared/pipe/currency-symbol.pipe';
import { TitleCasePipe } from '../../../shared/pipe/title-case.pipe';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { AsyncPipe } from '@angular/common';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-compeer',
    templateUrl: './compare.component.html',
    styleUrls: ['./compare.component.scss'],
    standalone: true,
    providers:[CurrencySymbolPipe],
    imports: [BreadcrumbComponent, NgbRating, NoDataComponent, 
      AsyncPipe, TitleCasePipe, CurrencySymbolPipe, TranslateModule]
})
export class CompareComponent {

  public breadcrumb: Breadcrumb = {
    title: "Compare",
    items: [{ label: 'Compare', active: true }]
  }

  public skeletonItems = Array.from({ length: 3 }, (_, index) => index);

  compareItems$: Observable<Product[]> = inject(Store).select(CompareState.compareItems);

  constructor(private store: Store, public compareService: CompareService) {
    this.store.dispatch(new GetCompare());
  }

  removeCompare(id: number){
    this.store.dispatch(new DeleteCompare(id));
  }
}
