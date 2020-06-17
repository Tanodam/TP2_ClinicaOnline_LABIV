import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { TurnosService } from 'src/app/services/turnos.service';
import { FormControl } from '@angular/forms';
import { SesionService } from 'src/app/services/sesion.service';
import { Sesion } from 'src/app/clases/sesion';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email:string = '';
  public clave:string = '';
  public usuariosLogin = [{email:"desariod95@gmail.com", contraseña:"123456", descripcion:"Paciente - Damian Deario"},
                          {email:"roque.perez@gmail.com", contraseña:"123456", descripcion:"Paciente - Roque Perez"},
                          {email:"flor1997@live.com.ar", contraseña:"123456", descripcion:"Medico - Florencia Picallo"},
                          {email:"gino.nazzi@gmail.com", contraseña:"123456", descripcion:"Medico - Gino Nazzi"},
                          {email:"claudio.gomez@gmail.com", contraseña:"123456", descripcion:"Medico - Claudio Gomez"},
                          {email:"admin@admin.com", contraseña:"123456", descripcion:"Admin - Admin"}]
  myRecaptcha = new FormControl(false);
  public captchaCompleto;

  constructor(private authService: AuthService, private router: Router, 
              private usuarioService:UsuariosService, private turnoService:TurnosService,
              private sesionService: SesionService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    let element: HTMLElement = document.getElementsByClassName('btn')[0] as HTMLElement;
    element.click();
    this.captchaCompleto = false;
  }
  
  onLogin():void{

      this.authService.loginEmailUser(this.email,this.clave)
      .then((res)=>
      {
        let usuario = this.usuarioService.traerUsuario(this.email);
        if(usuario.tipo == "MEDICO")
        {
          this.sesionService.crear(new Sesion(usuario.mail, usuario.nombre+" "+usuario.apellido,
          this.datepipe.transform(Date.now(), 'dd-MM-yyyy'), this.datepipe.transform(Date.now(), 'hh:mm:ss') ))
        }
        else if (usuario.tipo == "ADMIN")
        {
          this.sesionService.traerSesiones();
        }
        localStorage.setItem("usuarioEnLinea", JSON.stringify(usuario));
        this.turnoService.traerTurnos();
        this.onLoginRedirect();
      }).catch(err => {
        console.log('error: ' + err.message);
        document.getElementById("exampleModalCenter").classList.remove("modal", "show", "fade");
        document.getElementById("exampleModalCenter").innerHTML = "";
        let element: HTMLElement = document.getElementsByClassName('btn')[1] as HTMLElement;
        element.click();
      } );
    }
    
  onLoginRedirect():void{
    this.router.navigate(['']);
  }

  volverALogin()
  {
    location.reload();
  }

  completarCampos(email){
    this.email = email;
    this.clave = "123456";
  }

  resolved(captchaResponse: string) {
    this.captchaCompleto = true;
    console.log(`Resolved response token: ${captchaResponse}`);
   
  }

}
