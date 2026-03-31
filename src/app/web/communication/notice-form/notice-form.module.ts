import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticeFormPageRoutingModule } from './notice-form-routing.module';

import { NoticeFormPage } from './notice-form.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    NoticeFormPageRoutingModule
  ],
  declarations: [NoticeFormPage]
})
export class NoticeFormPageModule { }