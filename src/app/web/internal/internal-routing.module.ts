import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InternalPage } from './internal.page';

const routes: Routes = [
  {
    path: '',
    component: InternalPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      { path: '**', redirectTo: '/internal/home', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternalPageRoutingModule { }
