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
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
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
        path: 'settings',
        redirectTo: '/settings'
      },
    ]
  },
  {
    path: 'notice-detail/:id',
    loadChildren: () => import('../notice-detail/notice-detail.module').then(m => m.NoticeDetailPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternalTabsPageRoutingModule { }
