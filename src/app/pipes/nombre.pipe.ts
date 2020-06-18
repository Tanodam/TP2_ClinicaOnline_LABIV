import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from '../clases/usuario';

@Pipe({
  name: 'nombre'
})
export class NombrePipe implements PipeTransform {

  transform(value: Usuario, ...args: unknown[]): unknown {
    return value.nombre + " " + value.apellido;
  }

}
