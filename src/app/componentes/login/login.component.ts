import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email:string = '';
  public clave:string = '';

  constructor(private authService: AuthService, private router: Router, private usuarioService:UsuariosService) { }

  ngOnInit(): void {
    let element: HTMLElement = document.getElementsByClassName('btn')[0] as HTMLElement;
    element.click();
  }
  
  onLogin():void{
    this.authService.loginEmailUser(this.email,this.clave)
    .then((res)=>
    {
      let usuario = this.usuarioService.traerUsuario(this.email);
      localStorage.setItem("usuarioEnLinea", JSON.stringify(usuario));
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

  completarCampos(tipo:string){
    if(tipo === "paciente")
    {
      this.email = "desariod95@gmail.com";
      this.clave = "123456";
    }
    else if(tipo === "admin")
    {
      this.email = "admin@admin.com";
      this.clave = "123456";
    }
    else if(tipo === "medico")
    {
      this.email = "flor1997@live.com.ar";
      this.clave = "123456";
    }
  }
}
