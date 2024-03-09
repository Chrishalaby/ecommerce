import { LoadedComponent } from '@Types/general.types';
import { Routes } from '@angular/router';
import {
  AdminRoutes,
  AppRoutes,
  AttributeRoutes,
  AuthRoutes,
  ModuleRoutes,
  Params,
} from './shared/enums/routes.enum';

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
      {
        path: AdminRoutes.NewProduct,
        loadComponent: () =>
          import(
            '@Modules/admin/components/new-product/new-product.component'
          ).then((m: LoadedComponent) => m.NewProductComponent),
      },
      {
        path: ModuleRoutes.Attributes,
        // canActivate: [AuthGuard],
        // providers: [provideState(gradeFeature), provideEffects([AttributeEffects])],
        children: [
          {
            path: AppRoutes.Empty,
            loadComponent: () =>
              import(
                '@Modules/admin/components/attribute/components/attribute-list/attribute-list.component'
              ).then((x: LoadedComponent) => x.AttributesListComponent),
          },
          {
            path: AttributeRoutes.Create,
            loadComponent: () =>
              import(
                '@Modules/admin/components/attribute/components/attribute-create/attribute-create.component'
              ).then((x: LoadedComponent) => x.AttributesCreateComponent),
          },
          {
            path: `:${Params.Id}/${AttributeRoutes.Edit}`,
            loadComponent: () =>
              import(
                '@Modules/admin/components/attribute/components/attribute-edit/attribute-edit.component'
              ).then((x: LoadedComponent) => x.AttributesEditComponent),
          },
        ],
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
  // {
  //   path: AppRoutes.NotFound,
  //   component: NotFoundComponent,
  // },
];
