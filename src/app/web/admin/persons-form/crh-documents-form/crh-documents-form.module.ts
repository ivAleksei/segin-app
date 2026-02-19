import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrhDocumentsFormPageRoutingModule } from './crh-documents-form-routing.module';

import { CrhDocumentsFormPage } from './crh-documents-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrhDocumentsFormPageRoutingModule
  ],
  declarations: [CrhDocumentsFormPage]
})
export class CrhDocumentsFormPageModule { }
