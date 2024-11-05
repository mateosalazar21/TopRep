import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';

// Redirige a usuarios no autorizados a la página de inicio de sesión
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);

// Redirige a usuarios autorizados a la página principal
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    // Carga el módulo de la página de inicio de sesión de forma perezosa (lazy loading)
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    // Aplica la redirección si el usuario ya está autenticado
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'home',
    // Carga el módulo de la página principal de forma perezosa (lazy loading)
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    // Aplica la redirección si el usuario no está autenticado
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: '**',
    // Redirige cualquier ruta no coincidente a la página de inicio de sesión
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    // Configura el enrutador principal y aplica precarga de todos los módulos
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  // Exporta el módulo de enrutamiento para ser usado en otros módulos
  exports: [RouterModule]
})
export class AppRoutingModule { }

