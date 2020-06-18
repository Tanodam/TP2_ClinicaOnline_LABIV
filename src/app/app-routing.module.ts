import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { Routes, RouterModule } from '@angular/router'; 
import { InformacionComponent } from './pages/informacion/informacion.component';
import { RegisterComponent } from './componentes/register/register.component';
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './guards/auth.guard'
import { ListaMedicosAdminComponent } from './componentes/lista-medicos-admin/lista-medicos-admin.component';
import { ListaPacientesAdminComponent } from './componentes/lista-pacientes-admin/lista-pacientes-admin.component';
import { ConsultaTurnoComponent } from './componentes/consulta-turno/consulta-turno.component';
import { AltaTurnoComponent } from './componentes/alta-turno/alta-turno.component';
import { ConsultaTurnoMedicoComponent } from './componentes/consulta-turno-medico/consulta-turno-medico.component';
import { BuscadorTurnosComponent } from './componentes/buscador-turnos/buscador-turnos.component';
import { ArchivosComponent } from './componentes/archivos/archivos.component';
import { InformesComponent } from './componentes/informes/informes.component';

const routes: Routes = [{path: '' ,component: HomeComponent,  data: {animation: 'Inicio'}},
{path: 'Informacion' ,component: InformacionComponent, canActivate:[AuthGuard], data: {animation: 'Pacientes'} },
{path: 'Registro' ,component: RegisterComponent, },
{path: 'Login' ,component: LoginComponent},
{path: 'ListadoMedicos' ,component: ListaMedicosAdminComponent, canActivate:[AuthGuard], data: {animation: 'Pacientes'} },
{path: 'ListadoPacientes' ,component: ListaPacientesAdminComponent, canActivate:[AuthGuard], data: {animation: 'Medicos'} },
{path: 'altaTurnos' ,component: AltaTurnoComponent,canActivate:[AuthGuard], data: {animation: '*'}},
{path: 'consultaTurnos' ,component: ConsultaTurnoComponent,canActivate:[AuthGuard], data: {animation: 'Pacientes'} },
{path: 'consultaTurnoMedico' ,component: ConsultaTurnoMedicoComponent,canActivate:[AuthGuard], data: {animation: 'Medicos'}},
{path: 'todosLosTurnos' ,component: BuscadorTurnosComponent, canActivate:[AuthGuard],data: {animation: '*'}},
{path: 'informes' ,component: InformesComponent, canActivate:[AuthGuard],data: {animation: 'Graficos'}}
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
