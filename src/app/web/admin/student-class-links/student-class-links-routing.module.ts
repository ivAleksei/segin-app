import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentClassLinksPage } from './student-class-links.page';

const routes: Routes = [
  {
    path: '',
    component: StudentClassLinksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentClassLinksPageRoutingModule { }