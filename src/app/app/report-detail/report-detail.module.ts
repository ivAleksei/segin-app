import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportDetailPageRoutingModule } from './report-detail-routing.module';

import { ReportDetailPage } from './report-detail.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReportDetailPageRoutingModule
  ],
  declarations: [ReportDetailPage]
})
export class ReportDetailPageModule { }