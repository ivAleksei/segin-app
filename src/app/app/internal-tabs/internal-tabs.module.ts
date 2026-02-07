import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InternalTabsPageRoutingModule } from './internal-tabs-routing.module';

import { InternalTabsPage } from './internal-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InternalTabsPageRoutingModule
  ],
  declarations: [InternalTabsPage]
})
export class InternalTabsPageModule {}
