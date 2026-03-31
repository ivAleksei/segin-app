import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  // { path: '', loadChildren: () => import('./turmas-list/turmas-list.module').then(m => m.TurmasListPageModule) },
  // { path: ':id', loadChildren: () => import('./turma-detalhe/turma-detalhe.module').then(m => m.TurmaDetalhePageModule) },
  { path: '**', redirectTo: '/internal/admin/turmas' },
];

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class TurmasModule { }
