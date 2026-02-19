import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstitutionsPageRoutingModule } from './institutions-routing.module';

import { InstitutionsPage } from './institutions.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    InstitutionsPageRoutingModule
  ],
  declarations: [InstitutionsPage]
})
export class InstitutionsPageModule { }