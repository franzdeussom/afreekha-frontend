import { Component, Input, Output, EventEmitter, Inject, PLATFORM_ID, inject, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Category, CategoryModel } from '../../../interface/category.interface';
import { CategoryState } from '../../../state/category.state';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { response } from 'express';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    standalone: true,
    imports: [ButtonComponent, CarouselModule, ReactiveFormsModule, TranslateModule]
})

export class CategoriesComponent {

  category$: Observable<any> = inject(Store).select(CategoryState.category) as Observable<any>;

  @Input() category: Category[];
  @Input() style: string = 'vertical';
  @Input() title?: string;
  @Input() image?: string;
  @Input() theme: string;
  @Input() sliderOption: OwlOptions;
  @Input() selectedCategoryId: number;
  @Input() bgImage: string;

  @Output() selectedCategory: EventEmitter<number> = new EventEmitter();

  public categories: Category[];
  public selectedCategorySlug: string[] = [];
  public isBrowser: boolean;

  constructor(private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router, @Inject(PLATFORM_ID) platformID: object) {
    this.isBrowser = isPlatformBrowser(platformID);
    this.route.queryParams.subscribe(params => {
      this.selectedCategorySlug = params['category'] ? params['category'].split(',') : [];
    });
  }
 
  ngOnChanges(changes: SimpleChanges) {
    this.category$.subscribe((resp: any)=>{
        this.category = resp.data;
    });
  }
  
  selectCategory(id: number) {
    this.selectedCategory.emit(id);
  }

  redirectToCollection(nom: string) {
    /*let index = this.selectedCategorySlug.indexOf(slug);
    if(index === -1)
      this.selectedCategorySlug.push(slug);
    else
      this.selectedCategorySlug.splice(index,1);
*/
    this.router.navigate(['/collections'], {
      relativeTo: this.route,
      queryParams: {
        category: nom      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    });
  }

}
