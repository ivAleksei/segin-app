import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstitutionDetailPageRoutingModule } from './institution-detail-routing.module';

import { InstitutionDetailPage } from './institution-detail.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';
import { InstitutionDataPage } from './institution-data/institution-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    InstitutionDetailPageRoutingModule
  ],
  declarations: [
    InstitutionDetailPage,
    InstitutionDataPage
  ]
})
export class InstitutionDetailPageModule { }