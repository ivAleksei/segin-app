import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InternalPageRoutingModule } from './internal-routing.module';

import { InternalPage } from './internal.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';
import { PipesModule } from 'src/app/_shared/pipes/pipes.module';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    ComponentsModule,
    PipesModule,
    InternalPageRoutingModule
  ],
  declarations: [InternalPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InternalPageModule { }
