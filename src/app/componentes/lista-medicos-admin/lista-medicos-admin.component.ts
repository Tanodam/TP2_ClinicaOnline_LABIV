import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-lista-medicos-admin',
  templateUrl: './lista-medicos-admin.component.html',
  styleUrls: ['./lista-medicos-admin.component.css']
})
export class ListaMedicosAdminComponent implements OnInit {

  constructor(private usuarioService: UsuariosService) { }
  public profesionales = [];
  public selected;
  ngOnInit(): void {
   this.profesionales = this.usuarioService.traerMedicos();
  }

  seleccionado( profesional){
    this.selected=profesional;
    console.log("antes "+ this.selected);
  }

  habilitar(){
    console.log("despues" + this.selected);
    this.selected.aprobado = true;
    this.usuarioService.actualizar(this.selected);
  }

  deshabilitar()
  {
    this.selected.aprobado = false;
    this.usuarioService.actualizar(this.selected);
  }

}
