import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Usuario } from '../clases/usuario';
import { database } from 'firebase';
import { Medico } from '../clases/medico';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public usuarios = [];
  public medicos = [];
  public pacientes = [];

  constructor(private storage: AngularFireStorage) {
    this.usuarios = [];
    this.medicos = this.traerMedicos();
    this.pacientes = this.traerPacientes();
   }

  subirImagenes(e:any, nombreArchivo:string, number:number){
    const id = Math.random().toString(36).substring(2);
    const file =  e;
    const filePath =  nombreArchivo + nombreArchivo+number;
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

  public traerMedicos()
  { 
    let medicos = [];
    database().ref('medicos').once('value').then((snapshot) => 
    {
      snapshot.forEach((child) =>
      {
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
      return medicos;
    }

    public traerPacientes()
    {
      let pacientes = [];      
      database().ref('usuarios').once('value').then((snapshot) => 
      {
        pacientes = [];
        snapshot.forEach((child) =>
        {
          var data = child.val();
          pacientes.push(new Usuario(data.nombre , data.apellido , data.edad,data.mail,data.password,data.tipo,child.key));
          });        
          localStorage.setItem('pacientes', JSON.stringify(pacientes));
          pacientes.forEach(element => {
            this.usuarios.push(element);
          });
        })
        .catch((e) => console.info('Error. No se realizo el fetch: ' + e));
        return pacientes; 
      }

    public traerUsuario(email)
    {
      console.log(this.usuarios);
      let usuario = this.usuarios.find(x => x.mail === email);
        if(usuario)
        {
          return usuario.mail, usuario.tipo;
        }

    }
}
