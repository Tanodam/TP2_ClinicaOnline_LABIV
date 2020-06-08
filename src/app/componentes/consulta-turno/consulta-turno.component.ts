import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

import { Turno } from 'src/app/clases/turno';
import { TurnosService } from 'src/app/services/turnos.service';
import { Encuesta } from 'src/app/clases/encuesta';
import { EncuestasService } from 'src/app/services/encuestas.service';

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
  public selectorProfesional: number;
  public selectorStaff: number;
  public selectorClinica: number;
  public comentario:string;
  public encuestaCompleta:boolean;
  constructor(private usuarioService: UsuariosService, private turnosService: TurnosService,
    private encuestaService:EncuestasService) { }

  ngOnInit(): void {
    this.cargarSelect();
    this.resenia = "";
    this.nuevoEstado = null;
    this.comentario="";
    this.encuestaCompleta = false;
  }
  cargarSelect() {
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

  guardarResenia(): void {
    if (this.nuevoEstado) {
      this.selected.estado = this.nuevoEstado;
      this.selected.reseniaPaciente = this.resenia;
      this.turnosService.actualizar(this.selected).then(() => window.location.reload());
    }
    if (!this.nuevoEstado && this.resenia) {
      this.selected.reseniaPaciente = this.resenia;
      this.turnosService.actualizar(this.selected).then(() => window.location.reload());
    }

  }
  guardarEncuesta(): void {
    
    if(this.selected && this.selectorClinica >=0 && this.selectorProfesional >=0 && this.selectorStaff >= 0)
    {
      this.encuestaCompleta = true;
      this.encuestaService.crear(new Encuesta(this.selected.emailPaciente, this.selectorClinica, this.selectorProfesional,
                  this.selectorStaff, this.comentario, this.selected.id));
      this.selected.encuestaRealizada = true;
      this.turnosService.actualizar(this.selected);
      this.encuestaCompleta = false;
    }
  }

  encuestaValida():void{
    if(this.selected && this.selectorClinica >=0 && this.selectorProfesional >=0 && this.selectorStaff >= 0
      && this.comentario.length >= 0)
    {
      this.encuestaCompleta = true;
    }
    else if(this.resenia.length >= 0)
    {
      this.selected.reseniaPaciente = this.resenia;
    }
  }

  setRangeProfesional(value) {
    this.selectorProfesional = value;
    this.encuestaValida();
  }

  setRangeStaff(value) {
    this.selectorStaff = value;
    this.encuestaValida();
  }

  setRangeClinica(value) {
    this.selectorClinica = value;
    this.encuestaValida();
  }
}
