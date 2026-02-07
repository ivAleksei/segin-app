import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailAskPageRoutingModule } from './email-ask-routing.module';

import { EmailAskPage } from './email-ask.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailAskPageRoutingModule
  ],
  declarations: [EmailAskPage]
})
export class EmailAskPageModule {}
