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
  public imagen1;
  public imagen2;
  ngOnInit(): void {
    this.profesionales = [];
   this.profesionales = JSON.parse(localStorage.getItem("medicos"));
   
  }

  seleccionado( profesional){
    this.selected=profesional;
    this.usuarioService.bajarImagenes(profesional.mail+"1")
    .then(()=>  this.imagen1 = this.usuarioService.imgSrc);
    this.usuarioService.bajarImagenes(profesional.mail+"2")
    .then(()=>  this.imagen2 = this.usuarioService.imgSrc);
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
