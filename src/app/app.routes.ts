import { Routes } from '@angular/router';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { LayoutComponent } from './layout/layout.component';
import { content } from './shared/routes/routes';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/theme/paris',
        pathMatch: 'full',
      },
      {
        path: "maintenance",
        component: MaintenanceComponent
      },
      {
        path: "",
        component: LayoutComponent,
        children: content,
      }
];
