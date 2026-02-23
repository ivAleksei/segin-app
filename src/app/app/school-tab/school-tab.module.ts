import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchoolTabPageRoutingModule } from './school-tab-routing.module';

import { SchoolTabPage } from './school-tab.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    SchoolTabPageRoutingModule
  ],
  declarations: [SchoolTabPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SchoolTabPageModule {}
