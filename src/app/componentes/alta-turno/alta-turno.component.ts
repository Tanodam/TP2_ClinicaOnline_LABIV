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
  public horaSeleccionada = null;
  public fromDate;
  public toDate;
  public isDisabled
  public fechaTurno;
  public diasAtencionMedico = [];
  public sabado = false;
  public isActive;

  ctrl = new FormControl('', (control: FormControl) => {
    const value = control.value;
    if (!value) {
      this.isActive = false;
      return null;
    }

    if (value.hour < 8) {
      this.isActive = false;
      return { tooEarly: true };
    }
    if (value.hour > 19) {
      this.isActive = false;
      return { tooLate: true };
    }
    if (this.sabado) {
      this.isActive = false;
      return { tooLateSabado: true };
    }

    return null;
  });

  constructor(private formBuilder: FormBuilder, private calendar: NgbCalendar, private turnoService: TurnosService) {
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
    horasSelected: new FormControl(),
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

    this.isDisabled = (date: NgbDate, current: { month: number }) => {
      if (!this.diasAtencionMedico.includes(this.calendar.getWeekday(date).toString())) {
        return date.day;
      }
      if (this.calendar.getWeekday(date) === 6) {
        this.sabado = true;
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
          this.especialidadFiltrada === especialidad.descripcion && element.aprobado) {
          this.profesionales.push(element);
        }
      });
    });
  }
  comprobar() {
    this.fechaTurno = this.diaSeleccionado.day.toString() + "/" + this.diaSeleccionado.month.toString() + "/" + this.diaSeleccionado.year.toString();
    console.log(this.horaSeleccionada);
  }

  seleccionarDia(e): void {
    this.diaSeleccionado = e;
    this.sabado = false;
    if (this.calendar.getWeekday(e) === 6) {
      this.sabado = true;
    }

    this.ctrl = new FormControl('', (control: FormControl) => {
      const value = control.value;
      if (!value) {
        this.isActive = false;
        return null;
      }

      if (value.hour < 8) {
        this.isActive = false;
        return { tooEarly: true };
      }
      if (value.hour > 19) {
        this.isActive = false;
        return { tooLate: true };
      }
      if (this.sabado && value.hour > 14) {
        this.isActive = false;
        return { tooLateSabado: true };
      }
      else
      {
        this.isActive = true;
        if(value.minute == 0)
        { 
          this.horaSeleccionada = value.hour.toString() +":"+ "00";
        }
        else
        {
          this.horaSeleccionada = value.hour.toString() +":"+ value.minute.toString();
        }
      }

      return null;
    });
  }

  solicitarTurno(): void {
    let nombrePaciente = this.usuario.nombre +" "+ this.usuario.apellido;
    let nombreMedico = this.profesional.nombre +" "+ this.profesional.apellido
    this.turnoService.crear(new Turno(nombrePaciente, nombreMedico, this.usuario.mail, this.profesional.mail,
                this.fechaTurno, this.horaSeleccionada, 30, this.especialidadFiltrada,null,null,null,null,null));
  }
}
