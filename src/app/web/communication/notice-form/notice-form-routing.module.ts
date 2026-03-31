import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticeFormPage } from './notice-form.page';

const routes: Routes = [
  {
    path: '',
    component: NoticeFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticeFormPageRoutingModule { }