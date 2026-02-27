import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerformanceDetailPageRoutingModule } from './performance-detail-routing.module';

import { PerformanceDetailPage } from './performance-detail.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PerformanceDetailPageRoutingModule
  ],
  declarations: [PerformanceDetailPage]
})
export class PerformanceDetailPageModule { }