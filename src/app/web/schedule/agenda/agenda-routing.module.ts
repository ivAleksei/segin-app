import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleAgendaPage } from './agenda.page';

const routes: Routes = [{ path: '', component: ScheduleAgendaPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleAgendaPageRoutingModule { }
