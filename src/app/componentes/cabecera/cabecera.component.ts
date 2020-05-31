import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  logueado:any = false;
  admin:any = false;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    let usuario = localStorage.getItem("usuarioEnLinea");
    if(usuario)
    {
      this.logueado = true;
      if(usuario.includes('ADMIN'))
      {
        this.admin = true;
      }
    }
    else{
      this.logueado = false;
    }
  }
  logOut()
  {
    this.authService.logoutUser();
    this.admin = false;
    this.logueado = false;
    
  }

}
