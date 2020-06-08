import { Injectable } from '@angular/core';
import { database } from 'firebase';
import { Encuesta } from '../clases/encuesta';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  constructor() { }

  public crear(turno: Encuesta) {
      database().ref('encuestas')
        .push(turno)
        .then(() => console.info("Alta exitosa" + turno))
        .catch(() => console.info("No se pudo realizar alta"));
        this.traerTurnos();
  }

  public traerTurnos(): Encuesta[]
  {
    let encuestas = new Array<Encuesta>();
    console.info("Fetch de todos las encuestas");

    database().ref('encuestas').on('value',(snapshot) => {         
        snapshot.forEach((child) =>{
          var data = child.val();
          encuestas.push(new Encuesta(data.mailPaciente, data.valorInstalaciones, data.valorProfesional, 
            data.valorStaffAdministrativo, data.consejo, data.idTurno));
        });
        localStorage.setItem('encuestas', JSON.stringify(encuestas));       
      })
      return encuestas;
  }
    
}
