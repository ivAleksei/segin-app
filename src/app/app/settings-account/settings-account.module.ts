import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsAccountPageRoutingModule } from './settings-account-routing.module';

import { SettingsAccountPage } from './settings-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsAccountPageRoutingModule
  ],
  declarations: [SettingsAccountPage]
})
export class SettingsAccountPageModule {}
