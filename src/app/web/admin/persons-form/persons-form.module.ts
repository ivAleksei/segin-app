import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonsFormPageRoutingModule } from './persons-form-routing.module';

import { PersonsFormPage } from './persons-form.page';
import { DirectivesModule } from 'src/app/_shared/directives/directives.module';
import { PersonsCRHsFormsModule } from './_persons-crh-forms.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectivesModule,
    PersonsFormPageRoutingModule,
    PersonsCRHsFormsModule
  ],
  declarations: [PersonsFormPage]
})
export class PersonsFormPageModule { }
