import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InternalTabsPage } from './internal-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: InternalTabsPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/internal/home',
      },
      {
        path: 'home-responsavel',
        loadChildren: () => import('../home-responsavel/home-responsavel.module').then(m => m.HomeResponsavelPageModule)
      },
      {
        path: 'home-aluno',
        loadChildren: () => import('../home-aluno/home-aluno.module').then(m => m.HomeAlunoPageModule)
      },
      {
        path: 'school-tab',
        loadChildren: () => import('../school-tab/school-tab.module').then(m => m.SchoolTabPageModule)
      },
      {
        path: 'home',
        redirectTo: '/internal/home-responsavel'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternalTabsPageRoutingModule { }
