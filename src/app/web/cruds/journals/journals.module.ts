import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { JournalsPageRoutingModule } from './journals-routing.module';
import { JournalsPage } from './journals.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ComponentsModule, JournalsPageRoutingModule],
  declarations: [JournalsPage]
})
export class JournalsPageModule {}
