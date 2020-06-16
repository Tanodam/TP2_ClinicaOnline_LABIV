import { Injectable } from '@angular/core';
import { Turno } from '../clases/turno';
import { database } from 'firebase';
import { Especialidad } from '../clases/especialidad';
import { DatePipe } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  
  constructor(private datepipe: DatePipe) { }
  private DateGenerator = require('random-date-generator');

  private turnosHarcodeados = [new Turno("Juan Gimenez", "Florencia Picallo", "juan.gimenez@outlook.com", "flor1997@live.com.ar", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Julian Escudero", "Florencia Picallo", "juan.gimenez@outlook.com", "flor1997@live.com.ar", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Diego Del Rio", "Florencia Picallo", "juan.gimenez@outlook.com", "flor1997@live.com.ar", this.randomDate(), "10:00", 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Sebastian Stefanetti", "Florencia Picallo", "juan.gimenez@outlook.com", "flor1997@live.com.ar", this.randomDate(), "10:30", 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Patricia Ramos", "Florencia Picallo", "juan.gimenez@outlook.com", "flor1997@live.com.ar", this.randomDate(), "11:30", 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Tereza Gerez", "Florencia Picallo", "juan.gimenez@outlook.com", "flor1997@live.com.ar", this.randomDate(), "15:30", 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Melanie Jazmin", "Florencia Picallo", "juan.gimenez@outlook.com", "flor1997@live.com.ar", this.randomDate(), "17:30", 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Yamila Picallo", "Florencia Picallo", "juan.gimenez@outlook.com", "flor1997@live.com.ar", this.randomDate(), "16:30", 30, "Podologia",null,null,null,"Finalizado",null,null),
  
  new Turno("Agustin Bofelli", "Claudio Gomez", "juan.gimenez@outlook.com", "claudio.gomez@gmail.com", this.randomDate(), "08:30", 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Nelson Desario", "Claudio Gomez", "juan.gimenez@outlook.com", "claudio.gomez@gmail.com", this.randomDate(), "12:30", 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Ivan Vargas", "Claudio Gomez", "juan.gimenez@outlook.com", "claudio.gomez@gmail.com", this.randomDate(), "13:30", 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Pablo Borsa", "Claudio Gomez", "juan.gimenez@outlook.com", "claudio.gomez@gmail.com", this.randomDate(), "14:30", 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Santiago Ramos", "Claudio Gomez", "juan.gimenez@outlook.com", "claudio.gomez@gmail.com", this.randomDate(), "16:30", 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Facundo Fasciolo", "Claudio Gomez", "juan.gimenez@outlook.com", "claudio.gomez@gmail.com", this.randomDate(), "17:00", 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Silvia Rodriguez", "Claudio Gomez", "juan.gimenez@outlook.com", "claudio.gomez@gmail.com", this.randomDate(), "17:30", 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Carina Cucchiara", "Claudio Gomez", "juan.gimenez@outlook.com", "claudio.gomez@gmail.com", this.randomDate(), "18:30", 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Omar Streisser", "Claudio Gomez", "juan.gimenez@outlook.com", "claudio.gomez@gmail.com", this.randomDate(), "19:00", 30, "Podologia",null,null,null,"Finalizado",null,null),
  
  new Turno("Pablo Gomez", "Gino Nazzi", "juan.gimenez@outlook.com", "gino.nazzi@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Ramiro Giraldi", "Gino Nazzi", "juan.gimenez@outlook.com", "gino.nazzi@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Luis Bertoli", "Gino Nazzi", "juan.gimenez@outlook.com", "gino.nazzi@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Julio Grondona", "Gino Nazzi", "juan.gimenez@outlook.com", "gino.nazzi@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Matias Ruiz", "Gino Nazzi", "juan.gimenez@outlook.com", "gino.nazzi@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Patricio Villarino", "Gino Nazzi", "juan.gimenez@outlook.com", "gino.nazzi@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Lujan Larriba", "Gino Nazzi", "juan.gimenez@outlook.com", "gino.nazzi@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Maite Nicole", "Gino Nazzi", "juan.gimenez@outlook.com", "gino.nazzi@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Thomas Duran", "Gino Nazzi", "juan.gimenez@outlook.com", "gino.nazzi@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Yanella Corizzo", "Gino Nazzi", "juan.gimenez@outlook.com", "graciela.fasciolo@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  
  new Turno("Malena Bauducco", "Graciela Fasciolo", "juan.gimenez@outlook.com", "graciela.fasciolo@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Marcos Galperin", "Graciela Fasciolo", "juan.gimenez@outlook.com", "graciela.fasciolo@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Jeff Bezos", "Graciela Fasciolo", "juan.gimenez@outlook.com", "graciela.fasciolo@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Javier Milei", "Graciela Fasciolo", "juan.gimenez@outlook.com", "graciela.fasciolo@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Samuel Fitzgerald", "Graciela Fasciolo", "juan.gimenez@outlook.com", "graciela.fasciolo@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Melisa Carpio", "Graciela Fasciolo", "juan.gimenez@outlook.com", "graciela.fasciolo@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Valentina Marasca", "Graciela Fasciolo", "juan.gimenez@outlook.com", "graciela.fasciolo@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Chiara Campodonico", "Graciela Fasciolo", "juan.gimenez@outlook.com", "graciela.fasciolo@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  
  new Turno("Miguel Lucchetta", "German Piñero", "juan.gimenez@outlook.com", "german.piñero@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Giovanni Sorti", "German Piñero", "juan.gimenez@outlook.com", "german.piñero@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Aldo Baio", "German Piñero", "juan.gimenez@outlook.com", "german.piñero@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Giacomo Maggiori", "German Piñero", "juan.gimenez@outlook.com", "german.piñero@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Bartolomeo Asta", "German Piñero", "juan.gimenez@outlook.com", "german.piñero@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Elisa Bacino", "German Piñero", "juan.gimenez@outlook.com", "german.piñero@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Leonardo Di Caprio", "German Piñero", "juan.gimenez@outlook.com", "german.piñero@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Marcos Schumacher", "German Piñero", "juan.gimenez@outlook.com", "german.piñero@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  new Turno("Raul Marcote", "German Piñero", "juan.gimenez@outlook.com", "german.piñero@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  
  // new Turno("Fernando Alonso", "Anabella Coto", "juan.gimenez@outlook.com", "ana.coto@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  // new Turno("Marc Marquez", "Anabella Coto", "juan.gimenez@outlook.com", "ana.coto@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  // new Turno("Leopoldo Giovanotti", "Anabella Coto", "juan.gimenez@outlook.com", "ana.coto@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),
  // new Turno("Esteban Quito", "Anabella Coto", "juan.gimenez@outlook.com", "ana.coto@gmail.com", this.randomDate(), this.getRandomArbitrary(), 30, "Podologia",null,null,null,"Finalizado",null,null),

]


// Retorna un número aleatorio entre min (incluido) y max (excluido)
private getRandomArbitrary() {
  let hora = Math.random() * (19 - 8) + 8;
  let minutero = Math.random() * (2 - 1) + 1;
  let minutos = "00";
  switch (minutero) {
    case 1:
       minutos = "00"
      break;
    case 2:
       minutos = "30"
        break;

  }
  return hora.toFixed() +":"+   minutos;
}
private randomDate() {
  let startDate = new Date(2020,6,14);
  let endDate = new Date(2020,6,29);
  return this.datepipe.transform(this.DateGenerator.getRandomDateInRange(startDate, endDate), 'dd-MM-yyyy'); // random date in range
}

public turnosHarcoded()
{
  return this.turnosHarcodeados;
}
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
            data.horario,data.duracion,data.especialidad,child.key,data.reseniaMedico,data.reseniaPaciente,
             data.estado, data.encuestaRealizada, data.arrayOpcionales));
        });
        localStorage.setItem('turnos', JSON.stringify(turnos));
        console.info("Turnos");
        console.log(turnos);         
      })
      return turnos;
  }

  public actualizar(turno: Turno)
  {     
     let turnos = JSON.parse(localStorage.getItem("turnos"));
  for (let i = 0; i < turnos.length; i++) {
    if (turnos[i].id === turno.id) {
      console.log(turnos[i]);
        turnos.splice(i, 1, turno);
    }
}
localStorage.setItem('turnos', JSON.stringify(turnos));
  return database().ref('turnos/' + turno.childKey)
                .update(turno)
                .then(() => {this.traerTurnos(), console.log("Actualizacion Exitosa")})
                .catch(() => console.info("No se pudo actualizar"));
    };
    
}
