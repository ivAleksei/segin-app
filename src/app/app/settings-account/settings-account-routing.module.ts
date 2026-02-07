import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsAccountPage } from './settings-account.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsAccountPageRoutingModule {}
