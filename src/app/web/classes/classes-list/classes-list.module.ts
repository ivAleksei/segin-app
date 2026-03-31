import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassesListPageRoutingModule } from './classes-list-routing.module';

import { ClassesListPage } from './classes-list.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ClassesListPageRoutingModule
  ],
  declarations: [ClassesListPage]
})
export class ClassesListPageModule { }