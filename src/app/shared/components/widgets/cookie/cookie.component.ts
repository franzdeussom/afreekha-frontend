import { Component, inject } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ThemeOptionState } from '../../../state/theme-option.state';
import { TranslateModule } from '@ngx-translate/core';
import { UpdateSession } from '../../../action/theme-option.action';

@Component({
    selector: 'app-cookie',
    templateUrl: './cookie.component.html',
    styleUrls: ['./cookie.component.scss'],
    standalone: true,
    imports: [TranslateModule]
})
export class CookieComponent {

  cookies$: Observable<boolean> = inject(Store).select(ThemeOptionState.cookies);

  public cookies: boolean = true;

  constructor(private store: Store){
    this.cookies$.subscribe(res => this.cookies = res);
  }

  acceptCookies(value: boolean) {
    this.store.dispatch(new UpdateSession('cookies', value));
  }

}
