import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

import { Turno } from 'src/app/clases/turno';
import { TurnosService } from 'src/app/services/turnos.service';

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
  constructor(private usuarioService: UsuariosService, private turnosService: TurnosService) { }

  ngOnInit(): void {
    this.cargarSelect();
    this.resenia = "";
  }
  cargarSelect() {
    this.estados = [];
    this.usuario = JSON.parse(localStorage.getItem("usuarioEnLinea"))
    this.turnos = JSON.parse(localStorage.getItem("turnos"));
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
    console.log(turno);
    this.resenia = turno.reseniaMedico;
    this.selected = turno;
    this.usuarioService.bajarImagenes(this.selected.emailPaciente + "1")
      .then(() => this.imagen1 = this.usuarioService.imgSrc);
    this.usuarioService.bajarImagenes(this.selected.emailPaciente + "2")
      .then(() => this.imagen2 = this.usuarioService.imgSrc);
  }

  cancelar() {
    this.selected.estado = "Cancelado";
    this.turnosService.actualizar(this.selected).then(() => {
      for (let i = 0; i < this.turnos.length; i++) {
        if (this.turnos.length[i].id === this.selected.id) {
          this.turnos.splice(i, 1, this.selected);
        }
      }
      localStorage.setItem("turnos", JSON.stringify(this.turnos));
      this.cargarSelect();
    })
  }

  atender():void
  {
    this.selected.estado = "Finalizado";
    this.selected.reseniaMedico = this.resenia;
    this.turnosService.actualizar(this.selected).then(() =>  window.location.reload());
  }

  aceptar():void
  {
    this.selected.estado = "Aceptado";
    this.selected.reseniaMedico = this.resenia;
    this.turnosService.actualizar(this.selected).then(() =>  window.location.reload());
  }

  guardarResenia():void
  {
    this.selected.reseniaMedico = this.resenia;
    this.turnosService.actualizar(this.selected).then(() =>  window.location.reload());/*.then(() =>  window.location.reload());*/
  }
}

/*//window.location.reload());
      for (let i = 0; i < this.turnos.length; i++) {
        if (this.turnos.length[i].id === this.selected.id) {
          this.turnos.splice(i, 1, this.selected);
        }
      }
      localStorage.setItem("turnos", JSON.stringify(this.turnos));
      this.cargarSelect();
    }  */