import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonLinksPage } from './person-links.page';

const routes: Routes = [
  {
    path: '',
    component: PersonLinksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonLinksPageRoutingModule { }