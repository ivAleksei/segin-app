import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { FloatingButtonsComponent } from './floating-buttons/floating-buttons.component';
import { PipesModule } from '../pipes/pipes.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { DataTableComponent } from './data-table/data-table.component';
import { DataTablesModule } from 'angular-datatables';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';

@NgModule({
  declarations: [
    DataTableComponent,
    FloatingButtonsComponent,
    AutocompleteComponent
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    DataTablesModule,
    PipesModule,
    LeafletModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    DataTableComponent,
    FloatingButtonsComponent,
    LeafletModule,
    AutocompleteComponent
  ]
})
export class ComponentsModule { }
