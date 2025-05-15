import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import {HomeAdminComponent} from './componentes/home-admin/home-admin.component';
import {HomeUserComponent} from './componentes/home-user/home-user.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: '/home-user', component: HomeUserComponent },
  { path: '/home-admin', component: HomeAdminComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/' },
];
