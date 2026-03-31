import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeStudentPageRoutingModule } from './home-student-routing.module';

import { HomeStudentPage } from './home-student.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    HomeStudentPageRoutingModule
  ],
  declarations: [HomeStudentPage]
})
export class HomeStudentPageModule {}
