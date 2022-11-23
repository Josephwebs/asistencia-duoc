import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ingreso',
    pathMatch: 'full',
  },
  {
    path: 'ingreso',
    loadChildren: () =>
      import('./pages/ingreso/ingreso.module').then((m) => m.IngresoPageModule),
  },
  {
    path: 'registrar',
    loadChildren: () =>
      import('./pages/registrar/registrar.module').then(
        (m) => m.RegistrarPageModule
      ),
  },
  {
    path: 'principal',
    loadChildren: () =>
      import('./pages/principal/principal.module').then(
        (m) => m.PrincipalPageModule
      ),
  },
  {
    path: 'editar',
    loadChildren: () =>
      import('./pages/editar/editar.module').then((m) => m.EditarPageModule),
  },
  {
    path: 'e404',
    loadChildren: () =>
      import('./pages/e404/e404.module').then((m) => m.E404PageModule),
  },
  {
    path: 'scanner',
    loadChildren: () =>
      import('./pages/scanner/scanner.module').then((m) => m.ScannerPageModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/e404/e404.module').then((m) => m.E404PageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
