import { Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { AdressesComponent } from './adresses/adresses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrderDetailsComponent } from './orders/details/details.component';
import { OrdersComponent } from './orders/orders.component';
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
        path: 'order',
        component: OrdersComponent
      },
      {
        path: 'order/details/:id',
        component: OrderDetailsComponent
      },
      {
        path: 'addresses',
        component: AdressesComponent
      }
    ]
  }
] as Routes;

