import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  // { path: '', loadChildren: () => import('./classes-list/classes-list.module').then(m => m.ClassesListPageModule) },
  // { path: ':id', loadChildren: () => import('./class-detail/class-detail.module').then(m => m.ClassDetailPageModule) },
  { path: '**', redirectTo: '/internal/admin/classes' },
];

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class ClassesModule { }
