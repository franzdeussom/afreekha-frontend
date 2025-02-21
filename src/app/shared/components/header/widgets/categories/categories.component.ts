import { Component, Input } from '@angular/core';
import { Option } from '../../../../interface/theme-option.interface';
import { TranslateModule } from '@ngx-translate/core';
import { CategoriesComponent } from '../../../widgets/categories/categories.component';
import { ButtonComponent } from '../../../widgets/button/button.component';

@Component({
    selector: 'app-header-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    standalone: true,
    imports: [ButtonComponent, CategoriesComponent, TranslateModule]
})
export class CategoriesBlockComponent {

  @Input() data: Option | null;

} 
