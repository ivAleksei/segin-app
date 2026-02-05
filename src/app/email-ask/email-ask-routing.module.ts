import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailAskPage } from './email-ask.page';

const routes: Routes = [
  {
    path: '',
    component: EmailAskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailAskPageRoutingModule {}
