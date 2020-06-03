import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buscadormedico',
  templateUrl: './buscadormedico.component.html',
  styleUrls: ['./buscadormedico.component.css']
})
export class BuscadormedicoComponent implements OnInit {
  
  public especialidades = [];
  @Output() especialidad = new EventEmitter<string>();
  constructor() { }
  
  ngOnInit(): void {
   console.log(this.traerEspecialidadesMedicos());
  }

  traerEspecialidadesMedicos():void
  {
    let profesionales = JSON.parse(localStorage.getItem("medicos"));
    profesionales.forEach(element => {
      if(element.aprobado)
      {
        element.especialidades.forEach(especialidad => {
          if(!this.especialidades.includes(especialidad.descripcion))
          {
            this.especialidades.push(especialidad.descripcion);
          }
        });
      }
    });
  }

  seleccionado(especialidad){
    this.especialidad.emit(especialidad);
  }

}
