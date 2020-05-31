import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { Routes, RouterModule } from '@angular/router'; 
import { InformacionComponent } from './pages/informacion/informacion.component';
import { RegisterComponent } from './componentes/register/register.component';
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './guards/auth.guard'
import { ListaMedicosAdminComponent } from './componentes/lista-medicos-admin/lista-medicos-admin.component';

const routes: Routes = [{path: '' ,component: HomeComponent},
{path: 'Informacion' ,component: InformacionComponent, canActivate:[AuthGuard]},
{path: 'Registro' ,component: RegisterComponent},
{path: 'Login' ,component: LoginComponent},
{path: 'ListadoMedicos' ,component: ListaMedicosAdminComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }