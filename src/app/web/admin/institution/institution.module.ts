import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InstitutionPageRoutingModule } from './institution-routing.module';
import { InstitutionPage } from './institution.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ComponentsModule, InstitutionPageRoutingModule],
  declarations: [InstitutionPage]
})
export class InstitutionPageModule { }
