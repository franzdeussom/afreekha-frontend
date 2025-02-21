import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { TranslateModule } from '@ngx-translate/core';
import { TitleCasePipe } from '../../../../../../shared/pipe/title-case.pipe';

@Component({
    selector: 'app-product-information',
    templateUrl: './product-information.component.html',
    styleUrls: ['./product-information.component.scss'],
    standalone: true,
    imports: [TitleCasePipe, TranslateModule]
})

export class ProductInformationComponent {

  @Input() product: Product | null;

}
