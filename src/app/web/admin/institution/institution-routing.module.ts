import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstitutionPage } from './institution.page';

const routes: Routes = [{ path: '', component: InstitutionPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstitutionPageRoutingModule { }
