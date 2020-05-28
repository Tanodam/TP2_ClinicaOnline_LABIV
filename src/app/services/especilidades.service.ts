import { Injectable } from '@angular/core';
import { Especialidad } from '../clases/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecilidadesService {
  private especialidades = [new Especialidad("001","Pediatria"),
  new Especialidad("002","Oftalmologia"),
  new Especialidad("003","Clinica"),
  new Especialidad("004","Otorrinolaringología"),
  new Especialidad("005","Cardiologia"),
  new Especialidad("006","Dermatologia")];

  constructor() {
   }
   
   obtenerEspecialidades()
   {
     return this.especialidades;
    }
  }