import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Params } from '../../../../../../shared/interface/core.interface';
import { Category, CategoryModel } from '../../../../../../shared/interface/category.interface';
import { CategoryState } from '../../../../../../shared/state/category.state';
import { ProductState } from 'src/app/shared/state/product.state';


@Component({
  selector: 'app-subcategorie-filter',
  standalone: true,
  imports: [],
  templateUrl: './subcategorie-filter.component.html',
  styleUrl: './subcategorie-filter.component.scss'
})
export class SubcategorieFilterComponent {

  category$: Observable<CategoryModel> = inject(Store).select(CategoryState.category);

  @Input() filter: Params;

  public categories: any[] = [];
  public selectedCategories: string[] = [];

  constructor(private route: ActivatedRoute, private productState: ProductState,
    private router: Router){
    this.category$.subscribe((res) =>{
        if(res?.data.length){
            res?.data.forEach((val)=> {
              this.categories.push(...val.SousCategories);
            });

        }
    } );
  }

  ngOnChanges() {
    this.selectedCategories = this.filter['category'] ? this.filter['category'].split(',') : [];
  }

  applyFilter(event: Event) {
    this.selectedCategories = [];  // checked and unchecked value
    this.productState.isUniqueFilter = true;
    
    if ((<HTMLInputElement>event?.target)?.checked)
      this.selectedCategories.push((<HTMLInputElement>event?.target)?.value); // push in array cheked value
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        category: this.selectedCategories.length ? this.selectedCategories.join(",") : null
      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    });
  }

  // check if the item are selected
  checked(item: string){
    if(this.selectedCategories?.indexOf(item) != -1){
      return true;
    }
    return false;
  }

}
