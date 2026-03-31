import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';


const routes: Routes = [
  { path: 'teachers', loadChildren: () => import('./teachers/teachers.module').then(m => m.TeachersPageModule) },
  { path: 'students', loadChildren: () => import('./students/students.module').then(m => m.StudentsPageModule) },
  { path: 'guardians', loadChildren: () => import('./guardians/guardians.module').then(m => m.GuardiansPageModule) },
  { path: 'collaborators', loadChildren: () => import('./collaborators/collaborators.module').then(m => m.CollaboratorsPageModule) },
  { path: 'persons', loadChildren: () => import('./persons/persons.module').then(m => m.PersonsPageModule) },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersPageModule) },
  { path: 'classes', loadChildren: () => import('./classes/classes.module').then(m => m.ClassesPageModule) },
  { path: 'class-detail/:id', loadChildren: () => import('./classes/classes.module').then(m => m.ClassesPageModule) },
  { path: 'institutions', loadChildren: () => import('./institutions/institutions.module').then(m => m.InstitutionsPageModule) },
  { path: 'institution-detail/:id', loadChildren: () => import('./institution-detail/institution-detail.module').then(m => m.InstitutionDetailPageModule) },
  { path: 'audit', loadChildren: () => import('./logs/logs.module').then(m => m.LogsPageModule) },
  { path: 'person-links', loadChildren: () => import('./person-links/person-links.module').then(m => m.PersonLinksPageModule) },
  { path: 'enrollments', loadChildren: () => import('./student-class-links/student-class-links.module').then(m => m.StudentClassLinksPageModule) },
  { path: 'access-control', loadChildren: () => import('./access-control/access-control.module').then(m => m.AccessControlPageModule) },
  { path: 'notices', loadChildren: () => import('./notices/notices.module').then(m => m.NoticesPageModule) },
  { path: 'agenda', loadChildren: () => import('./agenda/agenda.module').then(m => m.AgendaPageModule) },
  { path: '**', redirectTo: '/internal/students' },
];

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class AdminModule { }
