import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClasseDetailPage } from './classe-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ClasseDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasseDetailPageRoutingModule { }