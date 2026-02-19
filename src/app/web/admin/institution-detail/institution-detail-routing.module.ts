import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstitutionDetailPage } from './institution-detail.page';

const routes: Routes = [
  {
    path: '',
    component: InstitutionDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionDetailPageRoutingModule { }