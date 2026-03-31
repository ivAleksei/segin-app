import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PersonDocumentsFormPageRoutingModule } from './documents-form-routing.module';
import { PersonDocumentsFormPage } from './documents-form.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PersonDocumentsFormPageRoutingModule],
  declarations: [PersonDocumentsFormPage]
})
export class PersonDocumentsFormPageModule { }
