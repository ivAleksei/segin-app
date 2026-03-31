import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DirectivesModule } from 'src/app/_shared/directives/directives.module';
import { ComponentsModule } from 'src/app/_shared/components/components.module';
import { PipesModule } from 'src/app/_shared/pipes/pipes.module';
import { PersonPersonalFormPage } from './personal-form/personal-form.page';
import { PersonDocumentsFormPage } from './documents-form/documents-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirectivesModule,
    ComponentsModule,
    PipesModule,
  ],
  declarations: [
    PersonDocumentsFormPage,
    PersonPersonalFormPage,
  ],
  exports: [
    PersonDocumentsFormPage,
    PersonPersonalFormPage,
  ]
})
export class PersonsFormsModule { }
