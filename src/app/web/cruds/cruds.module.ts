import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  { path: 'absences', loadChildren: () => import('./absences/absences.module').then(m => m.AbsencesPageModule) },
  { path: 'banners', loadChildren: () => import('./banners/banners.module').then(m => m.BannersPageModule) },
  { path: 'files', loadChildren: () => import('./files/files.module').then(m => m.FilesPageModule) },
  { path: 'journals', loadChildren: () => import('./journals/journals.module').then(m => m.JournalsPageModule) },
  { path: 'meals', loadChildren: () => import('./meals/meals.module').then(m => m.MealsPageModule) },
  { path: 'notifications', loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsPageModule) },
  { path: '**', redirectTo: '/internal/cruds/notifications' },
];

@NgModule({
  imports: [IonicModule, CommonModule, RouterModule.forChild(routes)],
  declarations: []
})
export class CrudsModule { }
