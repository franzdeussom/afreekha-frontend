import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CompareState } from '../../../state/compare.state';
import { GetCompare } from '../../../action/compare.action';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-sticky-compare',
    templateUrl: './sticky-compare.component.html',
    styleUrls: ['./sticky-compare.component.scss'],
    standalone: true,
    imports: [RouterLink, AsyncPipe, TranslateModule]
})
export class StickyCompareComponent {

  compareTotal$: Observable<number> = inject(Store).select(CompareState.compareTotal);

  constructor(private store: Store) {
    this.store.dispatch(new GetCompare());
  }

}
