import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccessControlPageRoutingModule } from './access-control-routing.module';

import { AccessControlPage } from './access-control.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    AccessControlPageRoutingModule
  ],
  declarations: [AccessControlPage]
})
export class AccessControlPageModule { }