export class Encuesta {
    public mailPaciente:string;
    public valorInstalaciones:number;
    public valorProfesional:number;
    public valorStaffAdministrativo:number;
    public consejo:string;
    public idTurno;
    public keyTurno;

    constructor(mailDelPaciente:string, valuacionInstalaciones:number, valuacionProfesional:number,
        valuacionStaffAdministrativo:number, consejo:string, idTurno:string, keyTurno:string){
       this.mailPaciente = mailDelPaciente;
       this.valorProfesional = valuacionProfesional;
       this.valorStaffAdministrativo = valuacionStaffAdministrativo;
       this.valorInstalaciones = valuacionInstalaciones;
       this.consejo = consejo;
       this.idTurno = idTurno;
       this.keyTurno = keyTurno;
        
    }
}
