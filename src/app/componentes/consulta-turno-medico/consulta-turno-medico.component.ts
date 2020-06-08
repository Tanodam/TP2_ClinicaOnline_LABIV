import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

import { Turno } from 'src/app/clases/turno';
import { TurnosService } from 'src/app/services/turnos.service';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { element } from 'protractor';
import { ElementSchemaRegistry } from '@angular/compiler';
import { Opcionales } from 'src/app/clases/opcionales';

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
  public hayOpcionales:boolean;
  @ViewChild('div') div: ElementRef;

  constructor(private usuarioService: UsuariosService, private turnosService: TurnosService, private renderer: Renderer2) {
    this.estados = [];
   }

  ngOnInit(): void {
    this.nuevoEstado = null;
    this.estados = [];
    this.resenia = "";
    this.turnos = [];
    this.usuario = JSON.parse(localStorage.getItem("usuarioEnLinea"))
    this.turnos = JSON.parse(localStorage.getItem("turnos"));
    this.hayOpcionales = false;
    
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
    let elementsDato = document.getElementsByName("dato");
    let elementsValor = document.getElementsByName("valor");

    if(this.nuevoEstado == "En Curso")
    {
      this.selected.estado = this.nuevoEstado;
    }
    if(elementsValor && elementsValor)
    {
      let arrayOpcionales:Array<Opcionales> = [];
      for (let index = 0; index < elementsValor.length; index++) {
        let dato = (elementsDato[index] as HTMLInputElement).value;
        let valor = (elementsValor[index] as HTMLInputElement).value;
       if(dato.length > 0 && valor.length > 0)
       {
         dato = dato[0].toLowerCase() + dato.substr(1).toLowerCase();
         arrayOpcionales.push(new Opcionales(dato, valor));
         Turno.AgregarDato(this.selected, "arrayOpcionales" , arrayOpcionales);
        }
      }
      console.log(this.selected);
    }
    if(this.nuevoEstado && this.nuevoEstado != "En Curso")
    {
      this.selected.estado = this.nuevoEstado;
      this.selected.reseniaMedico = this.resenia;
      this.turnosService.actualizar(this.selected).then(() =>  window.location.reload());
    }
  }

  agregarDato():void
  {
    const div: HTMLDivElement = this.renderer.createElement('div');

    const labelDato: HTMLLabelElement = this.renderer.createElement('label');
    const inputDato: HTMLInputElement = this.renderer.createElement('input');
    labelDato.htmlFor = "dato";
    labelDato.innerHTML = "Dato";
    inputDato.name = "dato";
    inputDato.type="text";
    inputDato.classList.add("inputDato");
    labelDato.classList.add("labelDato");

    const labelValor: HTMLLabelElement = this.renderer.createElement('label');
    const inputValor: HTMLInputElement = this.renderer.createElement('input');
    labelValor.htmlFor = "valor";
    labelValor.innerHTML = "Valor";
    inputValor.name = "valor";
    inputValor.classList.add("inputDato");
    labelValor.classList.add("labelDato");

    this.renderer.appendChild(div, labelDato);
    this.renderer.appendChild(div, inputDato);

     this.renderer.appendChild(div, labelValor);
     this.renderer.appendChild(div, inputValor);

     this.renderer.appendChild(this.div.nativeElement, div);

  }

  comprobar()
  {

  }
}
 