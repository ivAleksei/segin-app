import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClasseDetailPageRoutingModule } from './classe-detail-routing.module';

import { ClasseDetailPage } from './classe-detail.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ClasseDetailPageRoutingModule
  ],
  declarations: [ClasseDetailPage]
})
export class ClasseDetailPageModule { }