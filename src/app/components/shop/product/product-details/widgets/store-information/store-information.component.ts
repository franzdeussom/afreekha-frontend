import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../../shared/interface/store.interface';
import { TranslateModule } from '@ngx-translate/core';
import { SummaryPipe } from '../../../../../../shared/pipe/summary.pipe';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';

import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-store-information',
    templateUrl: './store-information.component.html',
    styleUrls: ['./store-information.component.scss'],
    standalone: true,
    imports: [RouterLink, NgbRating, SummaryPipe, TranslateModule]
})
export class StoreInformationComponent {

  @Input() store: Stores | null;

}
