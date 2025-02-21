import { Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { AdressesComponent } from './adresses/adresses.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationComponent } from './notification/notification.component';
import { OrderDetailsComponent } from './orders/details/details.component';
import { OrdersComponent } from './orders/orders.component';
import { PointComponent } from './point/point.component';
import { RefundComponent } from './refund/refund.component';
import { WalletComponent } from './wallet/wallet.component';

export default [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'wallet',
        component: WalletComponent
      },
      {
        path: 'notifications',
        component: NotificationComponent
      },
      {
        path: 'bank-details',
        component: BankDetailsComponent
      },
      {
        path: 'point',
        component: PointComponent
      },
      {
        path: 'order',
        component: OrdersComponent
      },
      {
        path: 'order/details/:id',
        component: OrderDetailsComponent
      },
      {
        path: 'refund',
        component: RefundComponent
      },
      {
        path: 'addresses',
        component: AdressesComponent
      }
    ]
  }
] as Routes;

