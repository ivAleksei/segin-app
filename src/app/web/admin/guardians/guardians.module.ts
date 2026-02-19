import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuardiansPageRoutingModule } from './guardians-routing.module';

import { GuardiansPage } from './guardians.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    GuardiansPageRoutingModule
  ],
  declarations: [GuardiansPage]
})
export class GuardiansPageModule { }