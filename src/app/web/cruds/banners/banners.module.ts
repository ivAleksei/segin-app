import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BannersPageRoutingModule } from './banners-routing.module';
import { BannersPage } from './banners.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ComponentsModule, BannersPageRoutingModule],
  declarations: [BannersPage]
})
export class BannersPageModule {}
