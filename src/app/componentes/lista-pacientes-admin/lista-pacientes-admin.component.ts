import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-lista-pacientes-admin',
  templateUrl: './lista-pacientes-admin.component.html',
  styleUrls: ['./lista-pacientes-admin.component.css']
})
export class ListaPacientesAdminComponent implements OnInit {

  constructor(private usuarioService: UsuariosService) { }
  public pacientes = [];
  public selected;
  public imagen1;
  public imagen2;
  ngOnInit(): void {
   this.pacientes = this.usuarioService.traerPacientes();
   
  }

  seleccionado( paciente){
    this.selected=paciente;
    this.usuarioService.bajarImagenes(paciente.mail+"1")
    .then(()=>  this.imagen1 = this.usuarioService.imgSrc);
    this.usuarioService.bajarImagenes(paciente.mail+"2")
    .then(()=>  this.imagen2 = this.usuarioService.imgSrc);
  }

  habilitar(){
    this.selected.aprobado = true;
    this.usuarioService.actualizar(this.selected);
  }

  deshabilitar()
  {
    this.selected.aprobado = false;
    this.usuarioService.actualizar(this.selected);
  }
}
