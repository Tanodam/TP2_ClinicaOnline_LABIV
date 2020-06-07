import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

import { Turno } from 'src/app/clases/turno';
import { TurnosService } from 'src/app/services/turnos.service';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-consulta-turno-medico',
  templateUrl: './consulta-turno-medico.component.html',
  styleUrls: ['./consulta-turno-medico.component.css']
})
export class ConsultaTurnoMedicoComponent implements OnInit {

  public turnos = [];
  public turnosPaciente = [];
  public estados = [];
  public usuario;
  public selected: Turno;
  public imagen1;
  public imagen2;
  public resenia;
  public estadoActual;
  public nuevoEstado;
  constructor(private usuarioService: UsuariosService, private turnosService: TurnosService) {
    this.estados = [];
   }

  ngOnInit(): void {
    this.nuevoEstado = null;
    this.estados = [];
    this.resenia = "";
    this.turnos = [];
    this.usuario = JSON.parse(localStorage.getItem("usuarioEnLinea"))
    this.turnos = JSON.parse(localStorage.getItem("turnos"));
    
    console.log(this.estados);
    this.turnos.forEach(element => {
      if (!this.estados.includes(element.estado) && element.emailMedico === this.usuario.mail) {
        this.estados.push(element.estado);
      }
    });
  }
  seleccionEstado(item): void {
    this.turnosPaciente = [];
    this.turnos = JSON.parse(localStorage.getItem("turnos"));
    this.turnos.forEach(element => {
      if (element.emailMedico === this.usuario.mail && element.estado == item) {
        this.turnosPaciente.push(element);
      }
    });
    console.log(this.turnosPaciente);
  }

  seleccionado(turno) {
    this.estadoActual = turno.estado;
    this.resenia = turno.reseniaMedico;
    this.selected = turno;
    this.usuarioService.bajarImagenes(this.selected.emailPaciente + "1")
      .then(() => this.imagen1 = this.usuarioService.imgSrc);
    this.usuarioService.bajarImagenes(this.selected.emailPaciente + "2")
      .then(() => this.imagen2 = this.usuarioService.imgSrc);
  }

  cancelar() {
    this.nuevoEstado = "Cancelado";
  }

  atender():void
  {
    this.nuevoEstado = "Finalizado";
  }

  aceptar():void
  {
    this.nuevoEstado = "Aceptado";
  }
  enCurso():void
  {
    this.nuevoEstado = "En Curso";
  }
  finalizar():void
  {
    this.nuevoEstado = "Finalizado";
  }

  guardarResenia():void
  {
    if(this.nuevoEstado && this.nuevoEstado != "En Curso")
    {
      this.selected.estado = this.nuevoEstado;
      this.selected.reseniaMedico = this.resenia;
      this.turnosService.actualizar(this.selected).then(() =>  window.location.reload());
    }
    if(this.nuevoEstado == "En Curso")
    {
      this.selected.estado = this.nuevoEstado;
    }
  }
}
