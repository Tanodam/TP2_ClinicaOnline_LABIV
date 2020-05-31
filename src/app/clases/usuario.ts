export class Usuario {

    public nombre: string;
    public apellido: string;
    public edad: number;
    public mail: string;
    public password: string;
    public id:string;
    public tipo:string;
    public iamgen1:string;
    public imagen2:string;
    public childKey = null;

    constructor(nombre: string,apellido: string,edad: number,mail: string,contraseña: string, tipos:string, childKey?:string){
        this.nombre=nombre;
        this.apellido=apellido;
        this.edad=edad;
        this.mail=mail;
        this.password=contraseña;
        this.tipo=tipos;
        if(childKey != null)
        {
            this.childKey = childKey;
        }    
    }
}
