import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeGuardianPage } from './home-guardian.page';

const routes: Routes = [
  {
    path: '',
    component: HomeGuardianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeGuardianPageRoutingModule {}
