import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

import { Turno } from 'src/app/clases/turno';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-consulta-turno',
  templateUrl: './consulta-turno.component.html',
  styleUrls: ['./consulta-turno.component.css']
})
export class ConsultaTurnoComponent implements OnInit {

  public turnos = [];
  public turnosPaciente = [];
  public estados = [];
  public usuario;
  public selected: Turno;
  public imagen1;
  public imagen2;
  public resenia;
  public nuevoEstado;
  public estadoActual;
  constructor(private usuarioService: UsuariosService, private turnosService:TurnosService) { }

  ngOnInit(): void {
    this.cargarSelect();
    this.resenia = "";
    this.nuevoEstado = null;
  }
  cargarSelect()
  {
    this.estados = [];
    this.usuario = JSON.parse(localStorage.getItem("usuarioEnLinea"))
    this.turnos = JSON.parse(localStorage.getItem("turnos"));
    this.turnos.forEach(element => {
      if (!this.estados.includes(element.estado) && element.emailPaciente === this.usuario.mail) {
        this.estados.push(element.estado);
      }
    });
  }
  seleccionEstado(item): void {
    this.turnosPaciente = [];
    this.turnos = JSON.parse(localStorage.getItem("turnos"));
    this.turnos.forEach(element => {
      if (element.emailPaciente === this.usuario.mail && element.estado == item) {
        this.turnosPaciente.push(element);
      }
    });
    console.log(this.turnosPaciente);
  }

  seleccionado(turno) {
    this.estadoActual = turno.estado;
    this.resenia = turno.reseniaPaciente;
    this.selected = turno;
    this.usuarioService.bajarImagenes(this.selected.emailMedico + "1")
      .then(() => this.imagen1 = this.usuarioService.imgSrc);
    this.usuarioService.bajarImagenes(this.selected.emailMedico + "2")
      .then(() => this.imagen2 = this.usuarioService.imgSrc);
  }

  cambiarEstado() {
    this.nuevoEstado = "Cancelado";
  }

  guardarResenia():void
  {
    if(this.nuevoEstado)
    {
      console.log(this.nuevoEstado);
      this.selected.estado = this.nuevoEstado;
      this.selected.reseniaPaciente = this.resenia;
      this.turnosService.actualizar(this.selected).then(() =>  window.location.reload());
    }
    if(!this.nuevoEstado && this.resenia){
      this.selected.reseniaPaciente = this.resenia;
      this.turnosService.actualizar(this.selected).then(() =>  window.location.reload());
    }
    
  }
}
