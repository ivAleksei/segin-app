import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InternalPage } from './internal.page';

const routes: Routes = [
  {
    path: '',
    component: InternalPage,
    children: [
      { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule) },
      { path: 'admin', loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule) },
      { path: 'students', loadChildren: () => import('../students/students.module').then(m => m.StudentsModule) },
      { path: 'communication', loadChildren: () => import('../communication/communication.module').then(m => m.CommunicationModule) },
      { path: 'teaching', loadChildren: () => import('../teaching/teaching.module').then(m => m.TeachingModule) },
      { path: 'schedule', loadChildren: () => import('../schedule/schedule.module').then(m => m.ScheduleModule) },
      { path: 'classes', loadChildren: () => import('../classes/classes.module').then(m => m.ClassesModule) },
      { path: 'about', loadChildren: () => import('../about/about.module').then(m => m.AboutPageModule) },
      { path: 'notifications', loadChildren: () => import('../notifications/notifications.module').then(m => m.NotificationsPageModule) },
      { path: '**', redirectTo: '/internal/home', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternalPageRoutingModule { }
