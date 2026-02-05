import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelperPageRoutingModule } from './helper-routing.module';

import { HelperPage } from './helper.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelperPageRoutingModule
  ],
  declarations: [HelperPage]
})
export class HelperPageModule {}
