import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/services/turnos.service';
import { DatePipe, formatDate } from '@angular/common'

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  constructor(private turnoService:TurnosService, private datepipe: DatePipe) { }
  public sesiones:any;
  public turnos: any;
  public contadorPorEspecialidad:any;
  public especialidades:any;
  public dias;
  public contadorPorDias;
  public medicosPorDia;

  ngOnInit(): void {
    this.especialidades=[];
    this.dias=[];
    this.contadorPorDias=[];
    this.contadorPorEspecialidad = [];
    this.medicosPorDia=[];
    this.sesiones = JSON.parse(localStorage.getItem("sesiones"));
    this.turnos = JSON.parse(localStorage.getItem("turnos"));
    this.turnoService.turnosHarcoded().forEach(element => {
      this.turnos.push(element);
    });
    this.turnos.forEach(element => {
      if(!this.dias.includes(element.fecha))
      {
        this.dias.push(element.fecha);
      }
      if(!this.especialidades.includes(element.especialidad))
      {
        this.especialidades.push(element.especialidad);
      }
    });
    this.especialidades.forEach(elemento => {
      let contador = 0;
      let contadorDias = 0;
      this.turnos.forEach(element => {
        if(element.especialidad == elemento)
        {
          contador++;
        }
      });
      this.contadorPorEspecialidad.push({"Especialidad":elemento, "Cantidad": contador})
    });
    this.dias.forEach(elemento => {
      let contadorDias = 0;
      let cantidadMedicos = 0
      let arrayMedicos=[];
      this.turnos.forEach(element => {
        if(element.fecha == elemento)
        {
          contadorDias++;
          if(!arrayMedicos.includes(element.emailMedico))
          {
            arrayMedicos.push(element.emailMedico);
            cantidadMedicos++;
          }
        }
      });
      let value = this.datepipe.transform(elemento,'EEEE, MMMM d, y');
      this.contadorPorDias.push({"Dia":value, "Cantidad Turnos": contadorDias})
      this.medicosPorDia.push({"Dia":value, "Cantidad Medicos": cantidadMedicos})
    });
    this.contadorPorDias.sort((b, a) => new Date(b.Dia).getTime() - new Date(a.Dia).getTime());
    this.medicosPorDia.sort((b, a) => new Date(b.Dia).getTime() - new Date(a.Dia).getTime());
    
  
    

  }

}
