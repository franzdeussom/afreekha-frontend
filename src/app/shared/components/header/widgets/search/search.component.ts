import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../widgets/button/button.component';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, ButtonComponent, TranslateModule]
})
export class SearchComponent {

  @Input() style: string = 'basic';

  public term = new FormControl();
  public show: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router) {
  }

  redirectToSearch() {
    this.router.navigate(['/search'], {
      relativeTo: this.route,
      queryParams: {
        category: null,
        search: this.term.value ? this.term.value : null
      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    });
  }

  toggleSearchBox(){
    this.show = !this.show
  }

}
