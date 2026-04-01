import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgendaTabPageRoutingModule } from './agenda-tab-routing.module';
import { AgendaTabPage } from './agenda-tab.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AgendaTabPageRoutingModule],
  declarations: [AgendaTabPage]
})
export class AgendaTabPageModule {}
