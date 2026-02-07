import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InternalTabsPage } from './internal-tabs.page';

const routes: Routes = [
  // {
  //   path: 'badges',
  //   loadChildren: () => import('../badges/badges.module').then(m => m.BadgesPageModule)
  // },
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
        path: 'home',
        redirectTo: '/internal/home-responsavel'
      },
      // {
      //   path: 'you',
      //   loadChildren: () => import('../personal-data/personal-data.module').then(m => m.PersonalDataPageModule)
      // },
      // {
      //   path: 'profile',
      //   loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      // },
      // {
      //   path: 'coach',
      //   loadChildren: () => import('../coach/coach.module').then(m => m.CoachPageModule)
      // },
      // {
      //   path: 'personal',
      //   loadChildren: () => import('../personal-data/personal-data.module').then(m => m.PersonalDataPageModule)
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternalTabsPageRoutingModule { }
