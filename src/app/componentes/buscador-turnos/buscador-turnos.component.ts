import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-buscador-turnos',
  templateUrl: './buscador-turnos.component.html',
  styleUrls: ['./buscador-turnos.component.css']
})
export class BuscadorTurnosComponent implements OnInit {

  constructor(private turnoService:TurnosService) { }
  public selectedCriteria: string;
  public filter: string;
  public turnos;
  public turnosFiltrados;
  public turnoSeleccinado;
  public encuestas;
  public encuestaSeleccionada;

  ngOnInit(): void {
    this.encuestaSeleccionada = null;
    this.turnoSeleccinado = null;
    this.encuestas = [];
    this.turnosFiltrados = [];
    this.turnos = JSON.parse(localStorage.getItem("turnos"));
    this.encuestas = JSON.parse(localStorage.getItem("encuestas"));
    this.selectedCriteria = "Todos"
    this.filtrar();
  }

  keyPress(event): void {
    this.filtrar();
  }

  filtrar(): void {
    this.turnosFiltrados = [];
    switch (this.selectedCriteria) {
      case "Medico":
        if (this.filter != null) {

          this.turnos.forEach(turno => {
            let medico = turno.medico.toLowerCase();
            if (this.filter != "" && this.filter.length >= 3 && medico.includes(this.filter.toLowerCase())) {
              // console.log(turno.medico);
              this.turnosFiltrados.push(turno);
            }
          })
        }
        break;
      case "Paciente":
        if (this.filter != null) {

          this.turnos.forEach(turno => {
            let paciente = turno.paciente.toLowerCase();
            if (this.filter.length >= 3 && paciente.includes(this.filter.toLowerCase())) {
              // console.log(turno.paciente);
              this.turnosFiltrados.push(turno);
            }
          })
        }
        break;
      case "Especialidad":
        if (this.filter != null) {

          this.turnos.forEach(turno => {
            let especialidad = turno.especialidad.toLowerCase();
            if (this.filter.length >= 3 && especialidad.includes(this.filter.toLowerCase())) {
              // console.log(turno.especialidad);
              this.turnosFiltrados.push(turno);
            }
          })
        }
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
      case "Todos":
        this.turnos.forEach(turno => {
          this.turnosFiltrados.push(turno);
        })
        break;  
      default:
        break;
    }
  }


  seleccionado(item)
  {
    this.turnoSeleccinado = item;
    console.log(this.turnoSeleccinado.encuestaRealizada);
    if(this.turnoSeleccinado.encuestaRealizada)
    {
      this.encuestaSeleccionada = this.encuestas.filter(x => x.keyTurno === this.turnoSeleccinado.childKey)[0];
    }
    console.log(this.encuestaSeleccionada);

  }

}
