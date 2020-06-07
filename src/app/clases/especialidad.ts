export class Especialidad {
    public descripcion:string;

    constructor(descripcion:string, codigo?:string){
        this.descripcion = descripcion[0].toUpperCase() + descripcion.substr(1).toLowerCase();
        
    }
}
