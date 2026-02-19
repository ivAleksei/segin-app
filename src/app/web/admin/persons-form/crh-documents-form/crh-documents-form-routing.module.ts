import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrhDocumentsFormPage } from './crh-documents-form.page';

const routes: Routes = [
  {
    path: '',
    component: CrhDocumentsFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrhDocumentsFormPageRoutingModule { }
