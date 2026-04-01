import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FilesPageRoutingModule } from './files-routing.module';
import { FilesPage } from './files.page';
import { ComponentsModule } from 'src/app/_shared/components/components.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ComponentsModule, FilesPageRoutingModule],
  declarations: [FilesPage]
})
export class FilesPageModule {}
