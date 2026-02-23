import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeResponsavelPageRoutingModule } from './home-responsavel-routing.module';

import { HomeResponsavelPage } from './home-responsavel.page';
import { PipesModule } from 'src/app/_shared/pipes/pipes.module';
import { ComponentsModule } from 'src/app/_shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ComponentsModule,
    HomeResponsavelPageRoutingModule
  ],
  declarations: [HomeResponsavelPage]
})
export class HomeResponsavelPageModule {}
