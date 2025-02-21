import { AsyncPipe, isPlatformBrowser, isPlatformServer, PlatformLocation } from '@angular/common';
import { Component, inject, Inject, Input, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Option } from '../../interface/theme-option.interface';
import { ThemeOptionState } from '../../state/theme-option.state';
import { BasicHeaderComponent } from './basic-header/basic-header.component';
import { ClassicHeaderComponent } from './classic-header/classic-header.component';
import { MinimalHeaderComponent } from './minimal-header/minimal-header.component';
import { StandardHeaderComponent } from './standard-header/standard-header.component';
import { MobileMenuComponent } from './widgets/mobile-menu/mobile-menu.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [BasicHeaderComponent, ClassicHeaderComponent, StandardHeaderComponent, MinimalHeaderComponent, MobileMenuComponent, AsyncPipe]
})
export class HeaderComponent {

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;
  
  @Input() logo?: string | undefined;

  public style: string = 'basic_header';
  public sticky: boolean = true;

  constructor(router: Router, @Inject(PLATFORM_ID) private platformId: Object, private platformLocation: PlatformLocation) {
    this.setHeader();
    router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        this.setHeader();
      }
    });
  }

  setHeader() {
    const pathname = isPlatformBrowser(this.platformId)
      ? window.location.pathname
      : isPlatformServer(this.platformId)
      ? this.platformLocation.pathname
      : null;

    if(pathname) {
      if(pathname.includes('/theme/rome')) {
        this.style = 'standard_header';
      } else if(pathname.includes('/theme/madrid')) {
        this.style = 'classic_header';
      } else if(pathname.includes('/theme/berlin') || pathname.includes('/theme/denver')) {
        this.style = 'minimal_header';
      } else {
        this.themeOption$.subscribe(theme => {
          this.style = theme?.header ? theme?.header?.header_options : 'basic_header';
          this.sticky = theme?.header && theme?.header?.sticky_header_enable ? true : this.sticky;
        });
      }
    }
  }

}
