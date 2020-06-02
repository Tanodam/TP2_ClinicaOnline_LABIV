import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-alta-turno',
  templateUrl: './alta-turno.component.html',
  styleUrls: ['./alta-turno.component.css']
})
export class AltaTurnoComponent implements OnInit {
  public profesionales = [];
  public especialidadFiltrada;
  constructor() { }

  ngOnInit(): void {
   }

   seleccionado( profesional){
    console.log(profesional);
  }
  filtrarEspecialidad(especialidad)
  {
    this.especialidadFiltrada = especialidad;
    this.filtrarMedicos();
  }
  filtrarMedicos()
  {
    this.profesionales = [];
    let profesionales = JSON.parse(localStorage.getItem("medicos"));
    profesionales.forEach(element => {
      element.especialidades.forEach(especialidad => {
        if(!this.profesionales.includes(element) && this.especialidadFiltrada === especialidad.descripcion)
        {
          console.log(especialidad)
          this.profesionales.push(element);
        }
      });
    });
  }
}
