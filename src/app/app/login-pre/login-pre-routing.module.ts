import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPrePage } from './login-pre.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPrePageRoutingModule {}
