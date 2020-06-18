import { Especialidad } from './especialidad';
import { ThrowStmt } from '@angular/compiler';
import { Opcionales } from './opcionales';
import { setLogLevel } from 'firebase';

export class Turno
{
    public id: string;
    public paciente: string;
    public medico: string;
    public duracion: number;
    public fecha: string;
    public horario: string;
    public reseniaPaciente:string;
    public reseniaMedico:string;
    public especialidad: Especialidad; 
    public estado: string;
    public horarios: string;
    public childKey:string = "";
    public emailPaciente:string = "";
    public emailMedico:string;
    public encuestaRealizada:boolean;
    public arrayOpcionales
    public static dias:string[] = ["Lunes", "Martes", "Miercoles","Jueves", "Viernes", "Sabado"];

        constructor(paciente: string, medico: string,emailPaciente:string,emailMedico:string, fecha: any, horario: string,
                                duracion: number, especialidad: any,
                                childKey?:string, reseniaMedico?:string,
                                reseniaPaciente?:string, estado?:string, encuesta?:boolean,
                                arrayOpcionales?:Array<Opcionales>, id?:string)
    {
        this.paciente = paciente;
        this.medico = medico;
        this.emailMedico = emailMedico;
        this.emailPaciente = emailPaciente;
        this.fecha = fecha;
        this.duracion = duracion;
        this.especialidad = especialidad;
        this.horario = horario;
        if(estado)
        {
            this.estado = estado;
        }
        else
        {
            this.estado = "Pendiente"
        }
        if(childKey)
        {
            this.childKey = childKey;
        }
        if(reseniaMedico)
        {
            this.reseniaMedico = reseniaMedico;
        }
        else{
            this.reseniaMedico = "";
        }
        if(reseniaPaciente)
        {
            this.reseniaPaciente = reseniaPaciente;
        }
        else
        {
            this.reseniaPaciente = "";
        }
        if(encuesta)
        {
            this.encuestaRealizada = encuesta;
        }
        else
        {
            this.encuestaRealizada = false;
        }
        if(arrayOpcionales)
        {
            this.arrayOpcionales = arrayOpcionales;
        }
        else
        {
            this.arrayOpcionales = [];
        }
    }

    generarId()
    {
        // let turnos = JSON.parse(localStorage.getItem("turnos"));
        // console.log(turnos.length);
        // if(!turnos)
        // {
        //     return "1";
        // }
        // else
        // {
        //     let ultimoTurno = turnos.length;
        //     ultimoTurno++
        //     return ultimoTurno;
        // }
    }

    public static AgregarDato(turno: Turno, key: string, value: any)
    {
        turno =  Object.defineProperty(turno, key, 
        {
            value: value,
            writable: true,
            enumerable: true,
        })
        return turno;
    }
}