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
import { UserHeaderComponent } from './user-header/user-header.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DataTableComponent,
    FloatingButtonsComponent,
    AutocompleteComponent,
    UserHeaderComponent
  ],
  imports: [
    IonicModule,
    RouterModule,
    FormsModule,
    CommonModule,
    DataTablesModule,
    FullCalendarModule,
    PipesModule,
    LeafletModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    LeafletModule,
    FullCalendarModule,
    DataTableComponent,
    FloatingButtonsComponent,
    AutocompleteComponent,
    UserHeaderComponent
  ]
})
export class ComponentsModule { }
