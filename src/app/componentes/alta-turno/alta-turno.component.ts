import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Usuario } from 'src/app/clases/usuario';
import { Medico } from 'src/app/clases/medico';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { TurnosService } from 'src/app/services/turnos.service';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-alta-turno',
  templateUrl: './alta-turno.component.html',
  styleUrls: ['./alta-turno.component.css']
})
export class AltaTurnoComponent implements OnInit {
  public profesionales = [];
  public especialidadFiltrada;
  public usuario: Usuario;
  public profesional: Medico;
  public diaSeleccionado;
  public minuteStep;
  public horaSeleccionada;
  public fromDate;
  public toDate;
  public isDisabled
  public fechaTurno;
  public diasAtencionMedico = [];
  constructor(private formBuilder: FormBuilder, private calendar: NgbCalendar, private turnoService:TurnosService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 15);
  }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem("usuarioEnLinea"));
    this.minuteStep = 30;
  }
  public turnoData: FormGroup = this.formBuilder.group({
    email: new FormControl(),
    nombre: new FormControl(),
    nombreProfesional: new FormControl(),
    diasSelected: new FormControl(),
    horasSelected: new FormControl()
  });
  seleccionado(profesional) {
    this.diasAtencionMedico = [];
    this.profesional = profesional;
    this.profesional.diasAtencion.forEach(element => {
      switch (element) {
        case "Lunes":
          this.diasAtencionMedico.push("1");
          break;
        case "Martes":
          this.diasAtencionMedico.push("2");
          break;
        case "Miercoles":
          this.diasAtencionMedico.push("3");
          break;
        case "Jueves":
          this.diasAtencionMedico.push("4");
          break;
        case "Viernes":
          this.diasAtencionMedico.push("5");
          break;
        case "Sabado":
          this.diasAtencionMedico.push("6");
          break;
      }
    });
    
    this.isDisabled = (date: NgbDate, current: {month: number}) => {   
      if(!this.diasAtencionMedico.includes(this.calendar.getWeekday(date).toString()))
      {    
          return date.day;
      }
      
    };
   
  }
  filtrarEspecialidad(especialidad) {
    this.especialidadFiltrada = especialidad;
    this.filtrarMedicos();
  }
  filtrarMedicos() {
    this.profesionales = [];
    let profesionales = JSON.parse(localStorage.getItem("medicos"));
    profesionales.forEach(element => {
      element.especialidades.forEach(especialidad => {
        if (!this.profesionales.includes(element) && 
        this.especialidadFiltrada === especialidad.descripcion) {
          this.profesionales.push(element);
        }
      });
    });
  }
  comprobar() {
    this.fechaTurno = this.diaSeleccionado.day.toString() +"/"+ this.diaSeleccionado.month.toString()+"/"+ this.diaSeleccionado.year.toString();
  }

  seleccionarHora(e): void {
    this.horaSeleccionada = e;
  }

  solicitarTurno():void
  {
    this.turnoService.crear(new Turno(this.usuario.mail, this.profesional.mail, this.fechaTurno, 
                                      this.horaSeleccionada, 30, this.especialidadFiltrada, "", "0"));
  }
}
