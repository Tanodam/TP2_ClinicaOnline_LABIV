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
  usuario:Usuario = null;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {

    this.usuario = JSON.parse(localStorage.getItem("usuarioEnLinea"));
  }
  logOut()
  {
    this.authService.logoutUser();
    this.admin = false;
    this.logueado = false;
    
  }

}
