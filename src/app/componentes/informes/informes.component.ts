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
  public diasDesordenados;
  public contadorPorDias;
  public medicosPorDia;
  public arrayMedicos;
  public turnosPorMedico;
  public contadorDias;
  public cantidadMedicos;

  ngOnInit(): void {
    this.especialidades=[];
    this.dias=[];
    this.diasDesordenados=[];
    this.turnosPorMedico = [];
    this.contadorPorDias=[];
    this.arrayMedicos=[]
    this.contadorPorEspecialidad = [];
    this.medicosPorDia=[];
    this.sesiones = JSON.parse(localStorage.getItem("sesiones"));
    this.turnos = JSON.parse(localStorage.getItem("turnos"));
    this.turnoService.turnosHarcoded().forEach(element => {
      this.turnos.push(element);
    });
    this.turnos.forEach(element => {
      let dia = this.datepipe.transform(new Date(element.fecha));
      if(!this.diasDesordenados.includes(dia))
      {
        this.diasDesordenados.push(dia);
      }
      if(!this.especialidades.includes(element.especialidad))
      {
        this.especialidades.push(element.especialidad);
      }
      if(!this.arrayMedicos.includes(element.medico))
      {
        this.arrayMedicos.push(element.medico);
      }
    });
    //console.log(this.diasDesordenados);
    this.diasDesordenados.sort((b, a) => new Date(b).getDay() - new Date(a).getDay());
    this.diasDesordenados.forEach(dia => {
      if(!this.dias.includes(this.datepipe.transform(new Date(dia),'EEEE')))
      {
        this.dias.push(this.datepipe.transform(new Date(dia),'EEEE'))
      }
    });
    console.log(this.dias)
    
    this.especialidades.forEach(elemento => {
      let contador = 0;;
      this.turnos.forEach(element => {
        if(element.especialidad == elemento)
        {
          contador++;
        }
      });
      this.contadorPorEspecialidad.push({"Especialidad":elemento, "Cantidad": contador})
    });
    this.dias.forEach(elemento => {
      this.contadorDias = 0;
      this.cantidadMedicos = 0;
      this.turnos.forEach(element => {
        if(this.datepipe.transform(new Date(element.fecha),'EEEE') == elemento)
        {
          this.contadorDias++;
          if(!this.arrayMedicos.includes(element.emailMedico))
          {
            //this.arrayMedicos.push(element.emailMedico);
            this.cantidadMedicos++;
          }
        }
      });
      this.contadorPorDias.push({"Dia":elemento, "CantidadTurnos": this.contadorDias})
      this.medicosPorDia.push({"Dia":elemento, "CantidadMedicos": this.cantidadMedicos})
    });
    // this.contadorPorDias.sort((b, a) => new Date(b.Dia).getDay() - new Date(a.Dia).getDay());
    // this.medicosPorDia.sort((b, a) => new Date(b.Dia).getTime() - new Date(a.Dia).getTime());

    this.arrayMedicos.forEach(medico => {
      let contadorTurnosPorMedico = 0;
      this.turnos.forEach(turno => {
        if(medico == turno.medico)
        {
          contadorTurnosPorMedico++;
        }
      });
      this.turnosPorMedico.push({"Medico":medico, "CantidadTurnos": contadorTurnosPorMedico})
    });
  }

}
