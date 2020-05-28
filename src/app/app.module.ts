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
import { AngularFireStorageModule } from '@angular/fire/storage'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    InformacionComponent,
    CabeceraComponent,
    LoginComponent,
    RegisterComponent,
    ImagenComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
