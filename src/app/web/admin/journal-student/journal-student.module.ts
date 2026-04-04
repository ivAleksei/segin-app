import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JournalStudentPageRoutingModule } from './journal-student-routing.module';

import { JournalStudentPage } from './journal-student.page';
import { PipesModule } from 'src/app/_shared/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    JournalStudentPageRoutingModule
  ],
  declarations: [JournalStudentPage]
})
export class JournalStudentPageModule { }
