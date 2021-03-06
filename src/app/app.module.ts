import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { InformacionComponent } from './pages/informacion/informacion.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './componentes/login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { environment } from '../environments/environment';
import { RegisterComponent } from './componentes/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImagenComponent } from './componentes/imagen/imagen.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ListaMedicosAdminComponent } from './componentes/lista-medicos-admin/lista-medicos-admin.component';
import { ListaPacientesAdminComponent } from './componentes/lista-pacientes-admin/lista-pacientes-admin.component';
import { AltaTurnoComponent } from './componentes/alta-turno/alta-turno.component';
import { ConsultaTurnoComponent } from './componentes/consulta-turno/consulta-turno.component';
import { BuscadormedicoComponent } from './componentes/buscadormedico/buscadormedico.component';
import { DisponibilidadMedicoComponent } from './componentes/disponibilidad-medico/disponibilidad-medico.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConsultaTurnoMedicoComponent } from './componentes/consulta-turno-medico/consulta-turno-medico.component';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BuscadorTurnosComponent } from './componentes/buscador-turnos/buscador-turnos.component';
import { DatePipe } from '@angular/common';
import { ArchivosComponent } from './componentes/archivos/archivos.component';
import { InformesComponent } from './componentes/informes/informes.component';
import { GraficosComponent } from './componentes/graficos/graficos.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { GraficobarrasComponent } from './componentes/graficos/graficobarras/graficobarras.component';
import { GraficoTortaComponent } from './componentes/graficos/grafico-torta/grafico-torta.component';
import { GraficoColumnasComponent } from './componentes/graficos/grafico-columnas/grafico-columnas.component';
import { NombrePipe } from './pipes/nombre.pipe';
import { ColorBotonDirective } from './directivas/color-boton.directive';
import { HighlightSearchPipe } from './pipes/highlight-search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    InformacionComponent,
    CabeceraComponent,
    LoginComponent,
    RegisterComponent,
    ImagenComponent,
    ListaMedicosAdminComponent,
    ListaPacientesAdminComponent,
    AltaTurnoComponent,
    ConsultaTurnoComponent,
    BuscadormedicoComponent,
    DisponibilidadMedicoComponent,
    ConsultaTurnoMedicoComponent,
    EncuestaComponent,
    BuscadorTurnosComponent,
    ArchivosComponent,
    InformesComponent,
    GraficosComponent,
    GraficobarrasComponent,
    GraficoTortaComponent,
    GraficoColumnasComponent,
    NombrePipe,
    ColorBotonDirective,
    HighlightSearchPipe,

  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    NgbModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    BrowserAnimationsModule,
    HighchartsChartModule
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
