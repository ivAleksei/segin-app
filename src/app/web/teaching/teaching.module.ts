import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  // { path: 'subjects', loadChildren: () => import('./subjects/subjects.module').then(m => m.SubjectsPageModule) },
  // { path: 'subjects/new', loadChildren: () => import('./subject-form/subject-form.module').then(m => m.SubjectFormPageModule) },
  // { path: 'assessments', loadChildren: () => import('./assessments/assessments.module').then(m => m.AssessmentsPageModule) },
  { path: '**', redirectTo: '/internal/schedule/agenda' },
];

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class TeachingModule { }
