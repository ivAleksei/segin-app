import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendaTabPage } from './agenda-tab.page';

const routes: Routes = [
  { path: '', component: AgendaTabPage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendaTabPageRoutingModule {}
