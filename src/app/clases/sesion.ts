import { ThrowStmt } from '@angular/compiler';

export class Sesion
{

    idUsuario: string;
    nombreUsuario: string;
    fechaLogin : string;
    horaLogin : string


    
    constructor(idUsuario: string, nombreUsuario: string, fechaLogin: string, horaLogin : string)
    {
        this.idUsuario = idUsuario;
        this.nombreUsuario = nombreUsuario;
        this.fechaLogin = fechaLogin;
        this.horaLogin = horaLogin;
    }
}