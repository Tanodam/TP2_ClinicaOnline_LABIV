import { Injectable } from '@angular/core';
import { Sesion } from '../clases/sesion';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor() { }

  public crear(sesion: Sesion) {
    database().ref('sesiones')
      .push(sesion)
      .then(() => {this.traerSesiones()})
      .catch(() => console.info("No se pudo realizar alta"));
}

public traerSesiones(): Sesion[]
  {
    let sesiones = new Array<Sesion>();
    console.info("Fetch de todos las sesiones");

    database().ref('sesiones').on('value',(snapshot) => {         
        snapshot.forEach((child) =>{
          var data = child.val();
          sesiones.push(new Sesion(data.idUsuario, data.nombreUsuario, data.fechaLogin, data.horaLogin));
        });
        localStorage.setItem('sesiones', JSON.stringify(sesiones));         
      })
      return sesiones;
  }
}
