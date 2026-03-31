import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScheduleAgendaPageRoutingModule } from './agenda-routing.module';
import { ScheduleAgendaPage } from './agenda.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ComponentsModule, ScheduleAgendaPageRoutingModule],
  declarations: [ScheduleAgendaPage]
})
export class ScheduleAgendaPageModule { }
