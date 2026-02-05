import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  { path: 'start', loadChildren: () => import('./start/start.module').then(m => m.StartPageModule) },
  { path: 'welcome', loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule) },
  {
    path: 'login-pre',
    loadChildren: () => import('./login-pre/login-pre.module').then(m => m.LoginPrePageModule)
  },
  {
    path: 'login-auth',
    loadChildren: () => import('./login-auth/login-auth.module').then(m => m.LoginAuthPageModule)
  },
  {
    path: 'login-auth/:id',
    loadChildren: () => import('./login-auth/login-auth.module').then(m => m.LoginAuthPageModule)
  },
  {
    path: 'login-recover',
    loadChildren: () => import('./login-recover/login-recover.module').then(m => m.LoginRecoverPageModule)
  },
  {
    path: 'login-register',
    loadChildren: () => import('./login-register/login-register.module').then(m => m.LoginRegisterPageModule)
  },
  {
    path: 'login-verify',
    loadChildren: () => import('./login-verify/login-verify.module').then(m => m.LoginVerifyPageModule)
  },
  {
    path: 'phone-verify',
    loadChildren: () => import('./phone-verify/phone-verify.module').then(m => m.PhoneVerifyPageModule)
  },
  {
    path: 'password-reset',
    loadChildren: () => import('./password-reset/password-reset.module').then(m => m.PasswordResetPageModule)
  },
  {
    path: 'phone-ask',
    loadChildren: () => import('./phone-ask/phone-ask.module').then(m => m.PhoneAskPageModule)
  },
  {
    path: 'email-ask',
    loadChildren: () => import('./email-ask/email-ask.module').then(m => m.EmailAskPageModule)
  },
  {
    path: 'internal',
    loadChildren: () => import('./internal-tabs/internal-tabs.module').then(m => m.InternalTabsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./helper/helper.module').then(m => m.HelperPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./terms/terms.module').then(m => m.TermsPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./privacy/privacy.module').then(m => m.PrivacyPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsPageModule)
  },
  { path: '**', redirectTo: 'start', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
