import { Component, inject } from '@angular/core';
import { Location, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Breadcrumb } from '../../../shared/interface/breadcrumb';
import { ThemeOptionState } from '../../../shared/state/theme-option.state';
import { Option } from '../../../shared/interface/theme-option.interface';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-error404',
    templateUrl: './error404.component.html',
    styleUrls: ['./error404.component.scss'],
    standalone: true,
    imports: [BreadcrumbComponent, ButtonComponent, AsyncPipe]
})
export class Error404Component {

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  public breadcrumb: Breadcrumb = {
    title: "404",
    items: [{ label: "404", active: true }]
  }

  constructor(private location: Location) {}

  back(){
    this.location.back();
  }

}
