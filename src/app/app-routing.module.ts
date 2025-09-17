import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { isLoggedGuard } from './guards/is-logged-guard';
import { TabComponent } from './shared/components/tab/tab.component';


const routes: Routes = [
  {
    path: 'tab',
    component: TabComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
        canActivate: [authGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'configuration',
        loadChildren: () => import('./pages/configuration/configuration.module').then( m => m.ConfigurationPageModule)
      },
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [isLoggedGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: '',
    redirectTo: 'tab/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
