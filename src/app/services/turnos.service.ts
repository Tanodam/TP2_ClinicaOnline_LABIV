import { Injectable } from '@angular/core';
import { Turno } from '../clases/turno';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor() { }

  public crear(turno: Turno) {
      database().ref('turnos')
        .push(turno)
        .then(() => console.info("Alta exitosa"))
        .catch(() => console.info("No se pudo realizar alta"));
  }
}
