import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeAlunoPage } from './home-aluno.page';

const routes: Routes = [
  {
    path: '',
    component: HomeAlunoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeAlunoPageRoutingModule {}
