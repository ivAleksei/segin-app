import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirectivesModule } from 'src/app/_shared/directives/directives.module';
import { ComponentsModule } from 'src/app/_shared/components/components.module';
import { PipesModule } from 'src/app/_shared/pipes/pipes.module';
import { CrhPersonalFormPage } from './crh-personal-form/crh-personal-form.page';
import { CrhDocumentsFormPage } from './crh-documents-form/crh-documents-form.page';

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
    CrhDocumentsFormPage,
    CrhPersonalFormPage,
  ],
  exports: [
    CrhDocumentsFormPage,
    CrhPersonalFormPage,
  ]
})
export class PersonsCRHsFormsModule { }
