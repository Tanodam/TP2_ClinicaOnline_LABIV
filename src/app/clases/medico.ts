import { Especialidad } from './especialidad';
import { Usuario } from './usuario';

export class Medico extends Usuario{

    public especialidades: Especialidad[];
    public aprobado: boolean;
    public diasAtencion: string[];
    public horasAtencion: string[];

    
    constructor( usuario:Usuario, especialidad:Especialidad[] , aprobado :boolean, diasAtencion:string[],
        horasAtencion:string[] ){
        super(usuario.nombre,usuario.apellido,usuario.edad,usuario.mail,usuario.password,usuario.tipo, usuario.childKey);
        this.especialidades=especialidad;
        this.diasAtencion = diasAtencion;
        this.horasAtencion = horasAtencion;
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
