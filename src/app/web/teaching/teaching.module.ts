import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  { path: 'subjects', loadChildren: () => import('./subjects/subjects.module').then(m => m.SubjectsPageModule) },
  { path: 'assessments', loadChildren: () => import('./assessments/assessments.module').then(m => m.AssessmentsPageModule) },
  { path: '**', redirectTo: '/internal/teaching/subjects' },
];

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class TeachingModule { }
