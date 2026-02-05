import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPrePageRoutingModule } from './login-pre-routing.module';

import { LoginPrePage } from './login-pre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPrePageRoutingModule
  ],
  declarations: [LoginPrePage]
})
export class LoginPrePageModule {}
