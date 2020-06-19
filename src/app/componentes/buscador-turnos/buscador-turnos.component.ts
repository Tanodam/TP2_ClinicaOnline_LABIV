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
    this.turnoService.turnosHarcoded().forEach(element => {
      this.turnos.push(element);
    });
    this.turnosFiltrados = this.turnos;
    this.filtrar();
  }

  keyPress(event): void {
    this.filtrar();
  }
  filtrar(): void {
    
    if (this.filter != null) {
      this.turnosFiltrados = [];
      this.turnos.forEach(turno => {
        for (const prop in turno) {
          let esChildKey = prop === "childKey";
          let esArrayOpcionales = prop === "arrayOpcionales";
          let esHora = prop === "horario";
          let esDia = prop === "fecha";
          let esMailMedico = prop === "emailMedico";
          let esMailPaciente = prop === "emailPaciente";
          if(typeof(turno[prop]) == 'string' && turno[prop].toLowerCase().includes(this.filter.toLowerCase()))
          {
            if(!esChildKey && !esArrayOpcionales && !esHora && !esMailMedico && !esMailPaciente &&
              !this.turnosFiltrados.includes(turno))
            {
              this.turnosFiltrados.push(turno);
            }
          }
          else if(esArrayOpcionales)
          {
            turno[prop].forEach(opcional => {
              let dato = opcional.dato.toLowerCase();
              let valor = opcional.valor.toLowerCase();
              if (!this.turnosFiltrados.includes(turno) && this.filter != "" && dato.includes(this.filter.toLowerCase())) {
                this.turnosFiltrados.push(turno);
              }
              if (!this.turnosFiltrados.includes(turno) && this.filter != "" && valor.includes(this.filter.toLowerCase())) {
                this.turnosFiltrados.push(turno);
              }
            });
          }
          
        }
        });          
    }
  }


  seleccionado(item)
  {
    this.turnoSeleccinado = item;
    if(this.turnoSeleccinado.encuestaRealizada)
    {
      this.encuestaSeleccionada = this.encuestas.filter(x => x.keyTurno === this.turnoSeleccinado.childKey)[0];
    }
  }

}
