import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscador-turnos',
  templateUrl: './buscador-turnos.component.html',
  styleUrls: ['./buscador-turnos.component.css']
})
export class BuscadorTurnosComponent implements OnInit {

  constructor() { }
  public selectedCriteria: string;
  public filter: string;
  public turnos;
  public turnosFiltrados;

  ngOnInit(): void {
    this.selectedCriteria = "Medico"
    this.turnos = JSON.parse(localStorage.getItem("turnos"));
  }

  keyPress(event): void {
    this.filtrar();
  }

  filtrar(): void {
    this.turnosFiltrados = [];
    switch (this.selectedCriteria) {
      case "Medico":
        this.turnos.forEach(turno => {
          let medico = turno.medico.toLowerCase();
          if (this.filter.length >= 3 && medico.includes(this.filter.toLowerCase())) {
            // console.log(turno.medico);
            this.turnosFiltrados.push(turno);
          }
        })
        break;
      case "Paciente":
        this.turnos.forEach(turno => {
          let paciente = turno.paciente.toLowerCase();
          if (this.filter.length >= 3 && paciente.includes(this.filter.toLowerCase())) {
            // console.log(turno.paciente);
            this.turnosFiltrados.push(turno);
          }
        })
        break;
      case "Especialidad":
        this.turnos.forEach(turno => {
          let especialidad = turno.especialidad.toLowerCase();
          if (this.filter.length >= 3 && especialidad.includes(this.filter.toLowerCase())) {
            // console.log(turno.especialidad);
            this.turnosFiltrados.push(turno);
          }
        })
        break;
      case "Fecha":
        this.turnos.forEach(turno => {
          if (this.filter == turno.fecha) {

              this.turnosFiltrados.push(turno);
          }
        })
        break;
      case "Opcional":
        this.turnos.forEach(turno => {
          console.log(turno.arrayOpcionales)
          turno.arrayOpcionales.forEach(opcional => {
            let dato = opcional.dato.toLowerCase();
            if (this.filter.length >= 3 && dato.includes(this.filter.toLowerCase())) {
              // console.log("Dato: " +  dato + " Valor: " + opcional.valor);
              this.turnosFiltrados.push(turno);
            }
          });
        })
        break;

      default:
        break;
    }
  }

}
