import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhoneAskPage } from './phone-ask.page';

const routes: Routes = [
  {
    path: '',
    component: PhoneAskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhoneAskPageRoutingModule {}
