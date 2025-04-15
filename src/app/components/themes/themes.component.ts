import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, Select  } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ThemeState } from '../../shared/state/theme.state';
import { GetHomePage } from '../../shared/action/theme.action';
import { ThemeOptionService } from '../../shared/services/theme-option.service';

import { ParisComponent } from './paris/paris.component';
import { AsyncPipe } from '@angular/common';
import { HomeState } from 'src/app/shared/state/home.state';
import { GetHomeData } from 'src/app/shared/action/home.action';
import { HomeData } from 'src/app/shared/interface/account.interface';
  
@Component({
    selector: 'app-themes',
    templateUrl: './themes.component.html',
    styleUrls: ['./themes.component.scss'],
    standalone: true,
    imports: [ParisComponent, AsyncPipe]
})
export class ThemesComponent {

  public slug: string;
  data$: Observable<any> = inject(Store).select(HomeState.homeData);
  
  constructor(private store: Store,
    private route: ActivatedRoute,
    private themeOptionService: ThemeOptionService) {
    this.route.params.subscribe(params => {
      this.themeOptionService.preloader = true;
      this.slug = params['slug'] ? params['slug'] : 'paris';
      
     this.store.dispatch(new GetHomeData);
    });
    
  }

}
