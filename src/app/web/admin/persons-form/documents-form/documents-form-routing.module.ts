import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonDocumentsFormPage } from './documents-form.page';

const routes: Routes = [{ path: '', component: PersonDocumentsFormPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonDocumentsFormPageRoutingModule { }
