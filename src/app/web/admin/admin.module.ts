import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';


const routes: Routes = [
  // { path: 'pessoas', loadChildren: () => import('./log-access/log-access.module').then(m => m.LogAccessPageModule) },
  // { path: 'usuarios', loadChildren: () => import('./log-access/log-access.module').then(m => m.LogAccessPageModule) },
  // { path: 'vinculos', loadChildren: () => import('./log-access/log-access.module').then(m => m.LogAccessPageModule) },
  // { path: 'turmas', loadChildren: () => import('./log-access/log-access.module').then(m => m.LogAccessPageModule) },
  // { path: 'escola', loadChildren: () => import('./log-access/log-access.module').then(m => m.LogAccessPageModule) },
  // { path: 'escolas', loadChildren: () => import('./log-access/log-access.module').then(m => m.LogAccessPageModule) },
  // { path: 'permissoes', loadChildren: () => import('./log-access/log-access.module').then(m => m.LogAccessPageModule) },
  // { path: 'auditoria', loadChildren: () => import('./log-access/log-access.module').then(m => m.LogAccessPageModule) },
  { path: "**", redirectTo: '/internal/alunos' },
];

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class AdminModule { }
