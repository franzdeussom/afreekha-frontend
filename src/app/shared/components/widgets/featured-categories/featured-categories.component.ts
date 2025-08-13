import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CategoryState } from 'src/app/shared/state/category.state';

@Component({
  selector: 'app-featured-categories',
  templateUrl: './featured-categories.component.html',
  styleUrls: ['./featured-categories.component.scss'],
  standalone: true
})
export class FeaturedCategoriesComponent implements OnInit {
  featuredCategorie$ : Observable<any> = inject(Store).select(CategoryState.category) as Observable<any>;
  featuredCategorie: any[] = []

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.featuredCategorie$.subscribe((val: any)=>{
      this.featuredCategorie = val.data.filter((cat: { featured: any; }) => cat.featured)

    })
  }

  redirection(nom: string){
    this.router.navigate(['/collections'], {
      relativeTo: this.route,
      queryParams: {
        category: nom      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    });
  }

}
