import { Especialidad } from './especialidad';
import { Usuario } from './usuario';

export class Medico extends Usuario{

    public especialidades: Especialidad[];
    public aprobado: boolean;

    
    constructor( usuario:Usuario, especialidad:Especialidad[] , aprobado :boolean ){
        super(usuario.nombre,usuario.apellido,usuario.edad,usuario.mail,usuario.password,usuario.tipo, usuario.childKey);
        this.especialidades=especialidad;
        if(aprobado != null)
        {
            this.aprobado = aprobado;
        }
        else
        {
            this.aprobado = false;
        }
    }

}{
}
