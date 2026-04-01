import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MealsPageRoutingModule } from './meals-routing.module';
import { MealsPage } from './meals.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ComponentsModule, MealsPageRoutingModule],
  declarations: [MealsPage]
})
export class MealsPageModule {}
