import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { Routes, RouterModule } from '@angular/router'; 
import { InformacionComponent } from './pages/informacion/informacion.component';
import { RegisterComponent } from './componentes/register/register.component';

const routes: Routes = [{path: '' ,component: HomeComponent},
{path: 'Informacion' ,component: InformacionComponent},
{path: 'Registro' ,component: RegisterComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
