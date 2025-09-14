import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BannerComponent } from 'src/app/components/themes/widgets/banner/banner.component';
import { MoreServiceState } from 'src/app/shared/state/more-service.state';

@Component({
  selector: 'app-moreService',
  templateUrl: './moreService.component.html',
  styleUrls: ['./moreService.component.scss'],
  standalone: true,
  imports: [TranslateModule, BannerComponent]
})
export class MoreServiceComponent implements OnInit {

  moreServiceOne$ : Observable<any> = inject(Store).select(MoreServiceState.moreSericeOne) as Observable<any>;
  moreServiceTwo$ : Observable<any> = inject(Store).select(MoreServiceState.moreSericeTwo) as Observable<any>;
  
  moreServiceOne: any[] = [];
  moreServiceTwo: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.moreServiceOne$.subscribe((val) => {
      this.moreServiceOne = val;
    });

    this.moreServiceTwo$.subscribe((val) => {
      this.moreServiceTwo = val;
    });
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
