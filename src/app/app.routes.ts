import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import {HomeAdminComponent} from './componentes/home-admin/home-admin.component';
import {HomeUserComponent} from './componentes/home-user/home-user.component';


import {loginGuard} from './guards/login.guard';
import {rolesGuard} from './guards/roles.guard';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'registro', component: RegistroComponent, canActivate: [loginGuard]  },
  { path: 'home-user', component: HomeUserComponent, canActivate: [rolesGuard], data: { expectedRole: ["USER"] } },
  { path: 'home-admin', component: HomeAdminComponent, canActivate: [rolesGuard], data: { expectedRole: ["ADMIN"] } },
  { path: '**', pathMatch: 'full', redirectTo: '/' },
];
