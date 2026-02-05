import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InternalTabsPage } from './internal-tabs.page';

const routes: Routes = [
  // {
  //   path: 'badges',
  //   loadChildren: () => import('../badges/badges.module').then(m => m.BadgesPageModule)
  // },
  // {
  //   path: 'tracker',
  //   loadChildren: () => import('../tracker/tracker.module').then(m => m.TrackerPageModule)
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
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      // {
      //   path: 'profile',
      //   loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      // },
      // {
      //   path: 'you',
      //   loadChildren: () => import('../personal-data/personal-data.module').then(m => m.PersonalDataPageModule)
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
