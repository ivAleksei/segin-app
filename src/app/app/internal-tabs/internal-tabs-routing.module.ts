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
        path: 'performance-tab',
        loadChildren: () => import('../performance-tab/performance-tab.module').then(m => m.PerformanceTabPageModule)
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
  {
    path: 'subject-detail/:id',
    loadChildren: () => import('../subject-detail/subject-detail.module').then(m => m.SubjectDetailPageModule)
  },
  {
    path: 'performance-detail/:id',
    loadChildren: () => import('../performance-detail/performance-detail.module').then(m => m.PerformanceDetailPageModule)
  },
  {
    path: 'report-detail/:id',
    loadChildren: () => import('../report-detail/report-detail.module').then(m => m.ReportDetailPageModule)
  },
  {
    path: 'journal-detail/:id',
    loadChildren: () => import('../journal-detail/journal-detail.module').then(m => m.JournalDetailPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternalTabsPageRoutingModule { }
