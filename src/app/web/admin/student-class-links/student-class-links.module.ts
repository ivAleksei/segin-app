import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentClassLinksPageRoutingModule } from './student-class-links-routing.module';

import { StudentClassLinksPage } from './student-class-links.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    StudentClassLinksPageRoutingModule
  ],
  declarations: [StudentClassLinksPage]
})
export class StudentClassLinksPageModule { }