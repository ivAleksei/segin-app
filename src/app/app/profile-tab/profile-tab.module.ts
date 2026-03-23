import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileTabPageRoutingModule } from './profile-tab-routing.module';

import { ProfileTabPage } from './profile-tab.page';
import { PipesModule } from 'src/app/_shared/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ProfileTabPageRoutingModule
  ],
  declarations: [ProfileTabPage]
})
export class ProfileTabPageModule {}
