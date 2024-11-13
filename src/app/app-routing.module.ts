import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';

// Redirige a usuarios no autorizados a la página de inicio de sesión
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
      ...canActivate(redirectLoggedInToHome),

  },
  {
    path: 'home',
    loadChildren: () => 
      import('./home/home.module').then(m => m.HomePageModule),
    ...canActivate(redirectUnauthorizedToLogin)  // Redirige a 'login' si el usuario no está autenticado
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    ...canActivate(redirectUnauthorizedToLogin)  // Redirige a 'login' si el usuario no está autenticado
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then(m => m.AddPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',  // Redirige cualquier ruta no coincidente a 'login'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
