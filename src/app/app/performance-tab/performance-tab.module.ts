import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerformanceTabPageRoutingModule } from './performance-tab-routing.module';

import { PerformanceTabPage } from './performance-tab.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';
import { PipesModule } from 'src/app/_shared/pipes/pipes.module';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      PipesModule,
      ComponentsModule,
      PerformanceTabPageRoutingModule
    ],
    declarations: [PerformanceTabPage],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PerformanceTabPageModule { }