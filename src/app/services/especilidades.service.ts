import { Injectable } from '@angular/core';
import { Especialidad } from '../clases/especialidad';
import * as firebase from 'firebase';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class EspecilidadesService {
  public especialidades = [];


  constructor() {
  }

  obtenerEspecialidades() {
    return this.especialidades;
  }

  public crear(especialidad: Especialidad) {
    database().ref('especialidades')
      .push(especialidad)
      .then(() => console.info("Alta exitosa"))
      .catch(() => console.info("No se pudo realizar alta"))
  }

  public traerEspecialidades(): Especialidad[]
  {
    let especialidades = new Array<Especialidad>();
    console.info("Fetch de todas las especialidades");

    database().ref('especialidades').on('value',(snapshot) => {         
        snapshot.forEach((child) =>{
          var data = child.val();
          especialidades.push(new Especialidad(data.descripcion));
        });
        console.info("Especialidades");
        console.log(this.especialidades);         
        localStorage.setItem('especialidades', JSON.stringify(especialidades));
    })
    return especialidades;
  }
}