import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolTabPage } from './school-tab.page';

const routes: Routes = [
  {
    path: '',
    component: SchoolTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolTabPageRoutingModule {}
