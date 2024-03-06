import { LoadedComponent } from '@Types/general.types';
import { Routes } from '@angular/router';
import {
  AdminRoutes,
  AppRoutes,
  AuthRoutes,
  ModuleRoutes,
} from './shared/enums/routes.enum';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: ModuleRoutes.Admin,
    // canActivate: [AdminGuard],
    children: [
      {
        path: AdminRoutes.Dashboard,
        loadComponent: () =>
          import(
            '@Modules/admin/components/dashboard/dashboard.component'
          ).then((m: LoadedComponent) => m.DashboardComponent),
      },
    ],
  },
  {
    path: AppRoutes.Empty,
    pathMatch: 'full',
    redirectTo: `${ModuleRoutes.Auth}/${AuthRoutes.Login}`,
  },
  {
    path: AppRoutes.Other,
    redirectTo: AppRoutes.NotFound,
  },
  {
    path: AppRoutes.NotFound,
    component: NotFoundComponent,
  },
];
