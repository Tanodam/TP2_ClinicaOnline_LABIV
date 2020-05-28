import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Usuario } from '../clases/usuario';
import { database } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private storage: AngularFireStorage) { }

  subirImagenes(e:any, nombreArchivo:string, number:number){
    const id = Math.random().toString(36).substring(2);
    const file =  e;
    const filePath =  nombreArchivo+'-images/' + nombreArchivo+number;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
  }

  public crear(usuario: Usuario)
  {
    if(usuario.tipo === "MEDICO")
    {
      database().ref('medicos')
                    .push(usuario)
                    .then(() => console.info("Alta exitosa"))
                    .catch(() => console.info("No se pudo realizar alta"));
    }
    else{
      database().ref('usuarios')
                    .push(usuario)
                    .then(() => console.info("Alta exitosa"))
                    .catch(() => console.info("No se pudo realizar alta"));
    }
  }

}
