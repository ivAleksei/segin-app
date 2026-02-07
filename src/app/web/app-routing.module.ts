import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  {
    path: 'start',
    loadChildren: () => import('./start/start.module').then(m => m.StartPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'internal',
    loadChildren: () => import('./internal/internal.module').then(m => m.InternalPageModule)
  },
  { path: '**', redirectTo: '/start', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
