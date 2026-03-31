import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  // { path: 'notices', loadChildren: () => import('./notices/notices.module').then(m => m.NoticesPageModule) },
  // { path: 'notices/new', loadChildren: () => import('./notice-form/notice-form.module').then(m => m.NoticeFormPageModule) },
  { path: '**', redirectTo: '/internal/classes' },
];

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class CommunicationModule { }
