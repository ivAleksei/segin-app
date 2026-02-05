import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsProfilePageRoutingModule } from './settings-profile-routing.module';

import { SettingsProfilePage } from './settings-profile.page';
import { DirectivesModule } from 'src/app/_shared/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectivesModule,
    SettingsProfilePageRoutingModule
  ],
  declarations: [SettingsProfilePage]
})
export class SettingsProfilePageModule { }
