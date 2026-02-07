import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InternalPage } from './internal.page';

const routes: Routes = [
  {
    path: '',
    component: InternalPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../content/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'credits',
        loadChildren: () => import('../content/credits/credits.module').then(m => m.CreditsPageModule)
      },
      {
        path: 'mapa-forca',
        loadChildren: () => import('src/apps/mapa-forca/content/mapa-forca.module').then(m => m.MapaForcaModule)
      },
      {
        path: 'profile',
        redirectTo: '/internal/crh/ficha'
      },
      {
        path: 'profile/:id',
        loadChildren: () => import('../content/admin/persons-form/persons-form.module').then(m => m.PersonsFormPageModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('../content/admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: 'bi',
        loadChildren: () => import('../content/bi/bi.module').then(m => m.BiModule)
      },
      {
        path: 'matbel',
        loadChildren: () => import('../content/matbel/matbel.module').then(m => m.MatBelModule)
      },
      {
        path: 'selecao',
        loadChildren: () => import('../content/selecao/selecao.module').then(m => m.SelecaoModule)
      },
      {
        path: 'glpi',
        loadChildren: () => import('../content/glpi/glpi.module').then(m => m.GlpiModule)
      },
      {
        path: 'CLOG',
        loadChildren: () => import('../content/CLOG/CLOG.module').then(m => m.CLOGModule)
      },
      {
        path: 'cblab',
        loadChildren: () => import('../content/cblab/cblab.module').then(m => m.CBLabModule)
      },
      {
        path: 'taf',
        loadChildren: () => import('../content/taf/taf.module').then(m => m.TAFModule)
      },
      {
        path: 'pca',
        loadChildren: () => import('../content/pca/pca.module').then(m => m.PCAModule)
      },
      {
        path: 'crh',
        loadChildren: () => import('../content/crh/crh.module').then(m => m.CRHModule)
      },
      {
        path: 'cgec',
        loadChildren: () => import('../content/cgec/cgec.module').then(m => m.cgecModule)
      },
      {
        path: 'saude',
        loadChildren: () => import('../content/saude/saude.module').then(m => m.SaudeModule)
      },
      {
        path: 'governanca',
        loadChildren: () => import('../content/governanca/governanca.module').then(m => m.GovernancaModule)
      },
      {
        path: 'security',
        loadChildren: () => import('../content/security/security.module').then(m => m.SecurityModule)
      },
      {
        path: 'escalas',
        loadChildren: () => import('../content/escalas/escalas.module').then(m => m.EscalasModule)
      },
      {
        path: 'extras',
        loadChildren: () => import('../content/extras/extras.module').then(m => m.ExtrasModule)
      },
      {
        path: 'cbfrotas',
        loadChildren: () => import('../content/cbfrotas/cbfrotas.module').then(m => m.CbFrotasModule)
      },
      {
        path: 'about',
        loadChildren: () => import('../content/about/about.module').then(m => m.AboutPageModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('../content/notifications/notifications.module').then(m => m.NotificationsPageModule)
      },
      {
        path: 'lotacao/:lotacao',
        loadChildren: () => import('../content/setor/setor.module').then(m => m.SetorModule)
      },
      { path: '**', redirectTo: '/internal/home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternalPageRoutingModule { }
