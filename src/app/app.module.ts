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
import { RecaptchaModule } from 'angular-google-recaptcha';

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
    RecaptchaModule.forRoot({
      siteKey: '6LeOigAVAAAAAGuH6uSPVqPnE6hpV11UmQLUdYm_',
  }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
