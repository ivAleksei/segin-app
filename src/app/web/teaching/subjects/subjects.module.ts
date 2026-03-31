import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SubjectsPageRoutingModule } from './subjects-routing.module';
import { SubjectsPage } from './subjects.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ComponentsModule, SubjectsPageRoutingModule],
  declarations: [SubjectsPage]
})
export class SubjectsPageModule { }
