import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Usuario } from '../clases/usuario';
import { database } from 'firebase';
import { Medico } from '../clases/medico';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public usuarios = [];
  public medicos = [];
  public pacientes = [];
  public imgSrc;
  

  constructor(private storage: AngularFireStorage) {
    this.usuarios = [];
    this.medicos = this.traerMedicos();
    this.pacientes = this.traerPacientes();
  }

  subirImagenes(e: any, nombreArchivo: string, number: number) {
    const file = e;
    const filePath = nombreArchivo + number;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
  }

  bajarImagenes(url: string) {
     return firebase.storage().ref().child(`${url}`).getDownloadURL()
      .then((url)=> this.imgSrc = url)
      .catch(error => console.error(error));
  }

  public crear(usuario: Usuario) {
    if (usuario.tipo === "MEDICO") {
      database().ref('medicos')
        .push(usuario)
        .then(() => console.info("Alta exitosa"))
        .catch(() => console.info("No se pudo realizar alta"));
    }
    else {
      database().ref('usuarios')
        .push(usuario)
        .then(() => console.info("Alta exitosa"))
        .catch(() => console.info("No se pudo realizar alta"));
    }
  }

  public traerMedicos() {
    let medicos = [];
    database().ref('medicos').once('value').then((snapshot) => {
      snapshot.forEach((child) => {
        var data = child.val();
        medicos.push(new Medico(new Usuario(data.nombre, data.apellido, data.edad, data.mail, data.password, data.tipo, child.key)
          , data.especialidades, data.aprobado));
      });
      localStorage.setItem('medicos', JSON.stringify(medicos));
      medicos.forEach(element => {
        this.usuarios.push(element);
      });
    })
      .catch((e) => console.info('Error. No se realizo el fetch: ' + e));
    this.usuarios.forEach(element => {
      if (element.tipo == "MEDICO") {
        medicos.push(element);
      }
    });
    return medicos;
  }

  public traerPacientes() {
    let pacientes = [];
    database().ref('usuarios').once('value').then((snapshot) => {
      snapshot.forEach((child) => {
        var data = child.val();
        pacientes.push(new Usuario(data.nombre, data.apellido, data.edad, data.mail, data.password, data.tipo, child.key));
      });
      localStorage.setItem('pacientes', JSON.stringify(pacientes));
      pacientes.forEach(element => {
        this.usuarios.push(element);
      });
    })
      .catch((e) => console.info('Error. No se realizo el fetch: ' + e));
      this.usuarios.forEach(element => {
        if (element.tipo == "USER") {
          pacientes.push(element);
        }
      });
    return pacientes;
  }

  public traerUsuario(email) {
    let usuario:Usuario = this.usuarios.find(x => x.mail === email);
    if (usuario) {
      return usuario ;
    }

  }

  public actualizar(usuario: Usuario) {
    if (usuario.tipo === "MEDICO") {
      database().ref('medicos/' + usuario.childKey)
        .update(usuario)
        .then(() => console.info("Actualizacion exitosa"))
        .catch(() => console.info("No se pudo actualizar"));
    }
  }
}
