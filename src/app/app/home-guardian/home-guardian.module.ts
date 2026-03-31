import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeGuardianPageRoutingModule } from './home-guardian-routing.module';

import { HomeGuardianPage } from './home-guardian.page';
import { PipesModule } from 'src/app/_shared/pipes/pipes.module';
import { ComponentsModule } from 'src/app/_shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ComponentsModule,
    HomeGuardianPageRoutingModule
  ],
  declarations: [HomeGuardianPage]
})
export class HomeGuardianPageModule {}
