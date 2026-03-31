import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  // { path: 'agenda', loadChildren: () => import('./agenda/agenda.module').then(m => m.AgendaPageModule) },
  // { path: 'agenda/publish', loadChildren: () => import('./agenda-form/agenda-form.module').then(m => m.AgendaFormPageModule) },
  // { path: 'meals', loadChildren: () => import('./meals/meals.module').then(m => m.MealsPageModule) },
  // { path: 'meals/log', loadChildren: () => import('./meals-log/meals-log.module').then(m => m.MealsLogPageModule) },
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
