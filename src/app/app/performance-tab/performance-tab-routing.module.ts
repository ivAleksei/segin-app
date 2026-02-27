import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerformanceTabPage } from './performance-tab.page';

const routes: Routes = [
  {
    path: '',
    component: PerformanceTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerformanceTabPageRoutingModule { }