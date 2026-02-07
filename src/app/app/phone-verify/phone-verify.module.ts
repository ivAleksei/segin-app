import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhoneVerifyPageRoutingModule } from './phone-verify-routing.module';

import { PhoneVerifyPage } from './phone-verify.page';
import { PipesModule } from 'src/app/_shared/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    PhoneVerifyPageRoutingModule
  ],
  declarations: [PhoneVerifyPage]
})
export class PhoneVerifyPageModule {}
