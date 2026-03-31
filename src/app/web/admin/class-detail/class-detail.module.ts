import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClassDetailPageRoutingModule } from './class-detail-routing.module';
import { ClassDetailPage } from './class-detail.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ClassDetailPageRoutingModule
  ],
  declarations: [ClassDetailPage]
})
export class ClassDetailPageModule { }
