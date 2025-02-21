import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NotificationState } from '../../../shared/state/notification.state';
import { MarkAsReadNotification } from '../../../shared/action/notification.action';
import { Notification } from "../../../shared/interface/notification.interface";
import { TranslateModule } from '@ngx-translate/core';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { AsyncPipe, DatePipe, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    standalone: true,
    imports: [NoDataComponent, AsyncPipe, DatePipe, TranslateModule]
})
export class NotificationComponent {

  notification$: Observable<Notification[]> = inject(Store).select(NotificationState.notification) as Observable<Notification[]>;

  constructor(private store: Store, @Inject(PLATFORM_ID) private platformId: object) {
  }

  ngOnDestroy() {
    if(isPlatformBrowser(this.platformId)) {
      this.store.dispatch(new MarkAsReadNotification());
    }
  }

}
