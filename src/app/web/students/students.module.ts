import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  { path: '', loadChildren: () => import('../admin/students/students.module').then(m => m.StudentsPageModule) },
  // { path: ':id/journal', loadChildren: () => import('./journal/journal.module').then(m => m.JournalPageModule) },
  // { path: ':id/attendance', loadChildren: () => import('./attendance/attendance.module').then(m => m.AttendancePageModule) },
  // { path: ':id/assessments', loadChildren: () => import('./assessments/assessments.module').then(m => m.AssessmentsPageModule) },
  // { path: ':id', loadChildren: () => import('./student-detail/student-detail.module').then(m => m.StudentDetailPageModule) },
  { path: '**', redirectTo: '/internal/students' },
];

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class StudentsModule { }
