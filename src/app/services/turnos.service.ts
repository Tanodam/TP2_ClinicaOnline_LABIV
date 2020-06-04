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
        .then(() => console.info("Alta exitosa" + turno))
        .catch(() => console.info("No se pudo realizar alta"));
        this.traerTurnos();
  }

  public traerTurnos(): Turno[]
  {
    let turnos = new Array<Turno>();
    console.info("Fetch de todos los turnos");

    database().ref('turnos').on('value',(snapshot) => {         
        snapshot.forEach((child) =>{
          var data = child.val();
          turnos.push(new Turno(data.paciente,data.medico,data.emailPaciente,data.emailMedico,data.fecha,
            data.horario,data.duracion,data.especialidad,child.key,data.reseniaMedico,data.reseniaPaciente, data.estado));
        });
        console.info("Turnos");
        console.log(turnos);         
        localStorage.setItem('turnos', JSON.stringify(turnos));
    })
    return turnos;
  }

  public actualizar(turno: Turno)
  {
    return database().ref('turnos/' + turno.childKey)
                  .update(turno)
                  .then(() => {this.traerTurnos(), console.log("Actualizacion Exitosa")})
                  .catch(() => console.info("No se pudo actualizar"));
    
  }
}
