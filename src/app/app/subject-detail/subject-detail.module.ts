import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubjectDetailPageRoutingModule } from './subject-detail-routing.module';

import { SubjectDetailPage } from './subject-detail.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';
import { PipesModule } from 'src/app/_shared/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ComponentsModule,
    SubjectDetailPageRoutingModule
  ],
  declarations: [SubjectDetailPage]
})
export class SubjectDetailPageModule { }