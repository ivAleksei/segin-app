import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollaboratorsPage } from './collaborators.page';

const routes: Routes = [
  {
    path: '',
    component: CollaboratorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollaboratorsPageRoutingModule { }