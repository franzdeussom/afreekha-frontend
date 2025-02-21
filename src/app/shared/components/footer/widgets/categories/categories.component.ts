import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Category, CategoryModel } from '../../../../../shared/interface/category.interface';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { CategoryState } from '../../../../../shared/state/category.state';

@Component({
    selector: 'app-footer-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    standalone: true,
    imports: [RouterLink]
})

export class FooterCategoriesComponent {

  @Input() data: Option | null;

  category$: Observable<CategoryModel> = inject(Store).select(CategoryState.category) as Observable<CategoryModel>;

  public categories: Category[];

  ngOnChanges(changes: SimpleChanges) {
    const ids = changes['data']?.currentValue?.footer?.footer_categories
    if (Array.isArray(ids)) {
      this.category$.subscribe(categories => {
        if(Array.isArray(categories.data)) {
          this.categories = categories.data.filter(category => ids?.includes(category.id));
        }
      })
    }
  }

}
