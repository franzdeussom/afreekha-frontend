import { Component, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesComponent } from '../../../../../shared/components/widgets/categories/categories.component';

@Component({
    selector: 'app-collection-categories',
    templateUrl: './collection-categories.component.html',
    styleUrls: ['./collection-categories.component.scss'],
    standalone: true,
    imports: [CategoriesComponent]
})
export class CollectionCategoriesComponent {

  @Input() style: string = 'vertical';
  @Input() image: string;
  @Input() theme: string;
  @Input() title: string;
  @Input() sliderOption: OwlOptions;

  constructor(){}

}
