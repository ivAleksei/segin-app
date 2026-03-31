import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  { path: 'agenda', loadChildren: () => import('./agenda/agenda.module').then(m => m.ScheduleAgendaPageModule) },
  { path: 'meals', loadChildren: () => import('./meals/meals.module').then(m => m.MealsPageModule) },
  { path: '**', redirectTo: '/internal/schedule/agenda' },
];

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class ScheduleModule { }
