import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';


const routes: Routes = [
  // { path: 'agenda', loadChildren: () => import('./log-access/log-access.module').then(m => m.LogAccessPageModule) },
  // { path: 'agenda/publicar', loadChildren: () => import('./users/users.module').then(m => m.UsersPageModule) },
  // { path: 'alimentacao', loadChildren: () => import('./log-access/log-access.module').then(m => m.LogAccessPageModule) },
  // { path: 'alimentacao/lancar', loadChildren: () => import('./users/users.module').then(m => m.UsersPageModule) },
  { path: "**", redirectTo: '/internal/rotina/agenda' },
];

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class RotinaModule { }
