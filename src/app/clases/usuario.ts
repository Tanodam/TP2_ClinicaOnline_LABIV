export class Usuario {

    public nombre: string;
    public apellido: string;
    public edad: number;
    public mail: string;
    public password: string;
    public id:string;
    public tipo:string;
    public imagen1:string = "";
    public imagen2:string = "";
    public childKey = null;


    constructor(nombre: string,apellido: string,edad: number,mail: string,
                contraseña: string, tipos:string, childKey?:string, imagen1?:string, imagen2?:string,){
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
        if(imagen1 != null)
        {
            this.imagen1 = imagen1;
        }  
        if(imagen2 != null)
        {
            this.imagen2 = imagen2;
        }  
    }
}
