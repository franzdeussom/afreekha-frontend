import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Attachment } from 'src/app/shared/interface/attachment.interface';
import { BrandsState } from 'src/app/shared/state/brands.state';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
  standalone: true,
  imports: [TranslateModule]
})
export class BrandsComponent implements OnInit {
  brands : Attachment[] = [];
  brands$: Observable<Attachment[]> = inject(Store).select(BrandsState.brandItems);

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {
   
   }

  ngOnInit() {
    this.brands$.subscribe((val) => {
      this.brands = this.store.selectSnapshot(BrandsState.brandItems) as Attachment[];
    });
  }

  redirect(nom: string){
    this.router.navigate(['/collections'], {
      relativeTo: this.route,
      queryParams: {
        category: nom    
        },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    });
  }
}
