import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonLinksPageRoutingModule } from './person-links-routing.module';

import { PersonLinksPage } from './person-links.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PersonLinksPageRoutingModule
  ],
  declarations: [PersonLinksPage]
})
export class PersonLinksPageModule { }