import { Especialidad } from './especialidad';
import { Usuario } from './usuario';

export class Medico extends Usuario{

    public especialidades: Especialidad[];
    public aprobado: boolean;

    
    constructor( usuario:Usuario, especialidad:Especialidad[] , aprobado :boolean ){
        super(usuario.nombre,usuario.apellido,usuario.edad,usuario.mail,usuario.password,usuario.tipo);
        this.especialidades=especialidad;
        this.aprobado = aprobado;
    }

}{
}
