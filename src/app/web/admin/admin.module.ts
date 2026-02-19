import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';


const routes: Routes = [
  { path: 'professores', loadChildren: () => import('./teachers/teachers.module').then(m => m.TeachersPageModule) },
  { path: 'alunos', loadChildren: () => import('./students/students.module').then(m => m.StudentsPageModule) },
  { path: 'responsaveis', loadChildren: () => import('./guardians/guardians.module').then(m => m.GuardiansPageModule) },
  { path: 'colaboradores', loadChildren: () => import('./collaborators/collaborators.module').then(m => m.CollaboratorsPageModule) },
  { path: 'pessoas', loadChildren: () => import('./persons/persons.module').then(m => m.PersonsPageModule) },
  
  
  { path: 'usuarios', loadChildren: () => import('./users/users.module').then(m => m.UsersPageModule) },
  { path: 'turmas', loadChildren: () => import('./classes/classes.module').then(m => m.ClassesPageModule) },
  { path: 'escolas', loadChildren: () => import('./institutions/institutions.module').then(m => m.InstitutionsPageModule) },
  { path: 'escola-detalhe/:id', loadChildren: () => import('./institution-detail/institution-detail.module').then(m => m.InstitutionDetailPageModule) },
  // { path: 'escola', loadChildren: () => import('./institution-detail/institution-detail.module').then(m => m.InstitutionDetailPageModule) },
  { path: 'auditoria', loadChildren: () => import('./logs/logs.module').then(m => m.LogsPageModule) },
  // { path: 'vinculos', loadChildren: () => import('./log-access/log-access.module').then(m => m.LogAccessPageModule) },
  { path: 'permissoes', loadChildren: () => import('./access-control/access-control.module').then(m => m.AccessControlPageModule) },
  { path: "**", redirectTo: '/internal/alunos' },
];

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class AdminModule { }
