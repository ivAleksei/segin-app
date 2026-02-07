import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';


const routes: Routes = [
  // { path: 'conteudos', loadChildren: () => import('./log-access/log-access.module').then(m => m.LogAccessPageModule) },
  // { path: 'conteudos/novo', loadChildren: () => import('./users/users.module').then(m => m.UsersPageModule) },
  // { path: 'avaliacoes', loadChildren: () => import('./log-access/log-access.module').then(m => m.LogAccessPageModule) },
  // { path: 'avaliacoes/lancar', loadChildren: () => import('./users/users.module').then(m => m.UsersPageModule) },
  { path: "**", redirectTo: '/internal/rotina/agenda' },
];

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class PedagogicoModule { }
