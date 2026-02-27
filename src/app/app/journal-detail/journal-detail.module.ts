import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JournalDetailPageRoutingModule } from './journal-detail-routing.module';

import { JournalDetailPage } from './journal-detail.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';
import { PipesModule } from 'src/app/_shared/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ComponentsModule,
    JournalDetailPageRoutingModule
  ],
  declarations: [JournalDetailPage]
})
export class JournalDetailPageModule { }