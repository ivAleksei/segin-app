import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhoneAskPageRoutingModule } from './phone-ask-routing.module';

import { PhoneAskPage } from './phone-ask.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhoneAskPageRoutingModule
  ],
  declarations: [PhoneAskPage]
})
export class PhoneAskPageModule {}
