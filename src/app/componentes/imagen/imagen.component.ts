import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.css']
})
export class ImagenComponent implements OnInit{
  
  @Output() imagen = new EventEmitter<any>();
  @Input() descrImagen: string;
  imgURL;
  archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  constructor() { }
  ngOnInit(): void {
    console.log(this.descrImagen);
  }

  public cambioArchivo(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.descrImagen = event.target.files[i].name;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name);
        this.imagen.emit(this.datosFormulario.get('archivo'));
      }
    }
  }


}
