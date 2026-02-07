import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeAlunoPageRoutingModule } from './home-aluno-routing.module';

import { HomeAlunoPage } from './home-aluno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeAlunoPageRoutingModule
  ],
  declarations: [HomeAlunoPage]
})
export class HomeAlunoPageModule {}
