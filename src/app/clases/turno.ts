import { Especialidad } from './especialidad';

export class Turno
{
    private contador:number = 0;
    public id: string;
    public detalle: string;
    public paciente: string;
    public medico: string;
    public duracion: number;
    public fecha: Date;
    public horario: string;
    public reseñaPaciente:string;
    public reseñaMedico:string;
    public especialidad: Especialidad; 
    public estado: string;
    public static dias:string[] = ["Lunes", "Martes", "Miercoles","Jueves", "Viernes", "Sabado"];
    public static horarios: string[] = ["8:00", "8:30" , "9:00", "9:30", "10:00", "10:30", "11:00", "11:30", 
                                        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00",
                                        "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"];

    constructor(paciente: string, medico: string, fecha: Date, horario: string,
                                duracion: number, especialidad: Especialidad,
                                detalle: string, id?: string)
    {
        this.paciente = paciente;
        this.medico = medico;
        this.fecha = fecha;
        this.duracion = duracion;
        this.especialidad = especialidad;
        this.detalle = detalle;
        this.estado = "Pendiente"
        this.horario = horario;
        this.id = id;
    }

    generarId()
    {
        //consulta a la base de datos
    }
}