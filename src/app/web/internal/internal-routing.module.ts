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
      { path: 'alunos', loadChildren: () => import('../alunos/alunos.module').then(m => m.AlunosModule) },
      { path: 'comunicacao', loadChildren: () => import('../comunicacao/comunicacao.module').then(m => m.ComunicacaoModule) },
      { path: 'pedagogico', loadChildren: () => import('../pedagogico/pedagogico.module').then(m => m.PedagogicoModule) },
      { path: 'rotina', loadChildren: () => import('../rotina/rotina.module').then(m => m.RotinaModule) },
      { path: 'turmas', loadChildren: () => import('../turmas/turmas.module').then(m => m.TurmasModule) },
      { path: '**', redirectTo: '/internal/home', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternalPageRoutingModule { }
