import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';


const routes: Routes = [
  { path: 'professores', loadChildren: () => import('./persons/persons.module').then(m => m.PersonsPageModule) },
  { path: 'alunos', loadChildren: () => import('./persons/persons.module').then(m => m.PersonsPageModule) },
  { path: 'responsaveis', loadChildren: () => import('./persons/persons.module').then(m => m.PersonsPageModule) },
  { path: 'colaboradores', loadChildren: () => import('./persons/persons.module').then(m => m.PersonsPageModule) },
  { path: 'pessoas', loadChildren: () => import('./persons/persons.module').then(m => m.PersonsPageModule) },
  
  
  { path: 'usuarios', loadChildren: () => import('./users/users.module').then(m => m.UsersPageModule) },
  { path: 'turmas', loadChildren: () => import('./classes/classes.module').then(m => m.ClassesPageModule) },
  { path: 'escolas', loadChildren: () => import('./institutions/institutions.module').then(m => m.InstitutionsPageModule) },
  { path: 'escola-detalhe/:id', loadChildren: () => import('./institution-detail/institution-detail.module').then(m => m.InstitutionDetailPageModule) },
  // { path: 'escola', loadChildren: () => import('./institution-detail/institution-detail.module').then(m => m.InstitutionDetailPageModule) },
  { path: 'auditoria', loadChildren: () => import('./logs/logs.module').then(m => m.LogsPageModule) },
  // { path: 'vinculos', loadChildren: () => import('./log-access/log-access.module').then(m => m.LogAccessPageModule) },
  // { path: 'permissoes', loadChildren: () => import('./log-access/log-access.module').then(m => m.LogAccessPageModule) },
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
