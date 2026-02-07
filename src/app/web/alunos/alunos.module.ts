import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';


const routes: Routes = [
  // { path: '', loadChildren: () => import('./log-access/log-access.module').then(m => m.LogAccessPageModule) },
  // { path: ':id/diario', loadChildren: () => import('./log-access/log-access.module').then(m => m.LogAccessPageModule) },
  // { path: ':id/frequencia', loadChildren: () => import('./log-access/log-access.module').then(m => m.LogAccessPageModule) },
  // { path: ':id/avaliacoes', loadChildren: () => import('./log-access/log-access.module').then(m => m.LogAccessPageModule) },
  // { path: ':id', loadChildren: () => import('./users/users.module').then(m => m.UsersPageModule) },
  { path: "**", redirectTo: '/internal/alunos' },
];

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class AlunosModule { }
