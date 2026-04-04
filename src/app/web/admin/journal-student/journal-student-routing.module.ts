import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JournalStudentPage } from './journal-student.page';

const routes: Routes = [
  {
    path: '',
    component: JournalStudentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JournalStudentPageRoutingModule {}
