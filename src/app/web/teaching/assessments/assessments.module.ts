import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AssessmentsPageRoutingModule } from './assessments-routing.module';
import { AssessmentsPage } from './assessments.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ComponentsModule, AssessmentsPageRoutingModule],
  declarations: [AssessmentsPage]
})
export class AssessmentsPageModule { }
