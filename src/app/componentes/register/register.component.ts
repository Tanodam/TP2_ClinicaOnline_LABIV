import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Especialidad } from 'src/app/clases/especialidad';
import { EspecilidadesService } from 'src/app/services/especilidades.service';
import { Usuario } from 'src/app/clases/usuario';
import { Medico } from 'src/app/clases/medico';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public email:string = '';
  public password:string = '';
  public profesional:any = false;
  public formInvalido:any = false;
  public imagenUno = false;
  public imagenDos = false;
  public especialidades:Especialidad[] = [];
  public dias = [];
  public horasAtencion = [];

  constructor(private authService: AuthService, private router: Router, private formBuilder:FormBuilder,
    private serviceEspecialidades:EspecilidadesService, private usuarioService:UsuariosService) {

    }
  
  public registerData: FormGroup = this.formBuilder.group({
    email: new FormControl('', [ Validators.email,Validators.required]),
    nombre: new FormControl('', [ Validators.minLength(3),Validators.required]),
    edad: new FormControl(null, [ Validators.min(1),Validators.required]),
    apellido: new FormControl('', [ Validators.minLength(3), Validators.required]),
    clave: new FormControl('', [Validators.minLength(6), Validators.required]),
    copyClave: new FormControl('', [Validators.minLength(6),Validators.required]),
    recaptchaReactive: new FormControl(null,Validators.required),
    especialidadesSelected: new FormControl(this.especialidades[0]),
    diasSelected: new FormControl(this.dias[0]),
    horasSelected: new FormControl(this.dias[0])
  });
  ngOnInit(): void {
    this.especialidades = this.serviceEspecialidades.obtenerEspecialidades();
    this.dias = Turno.dias;
    this.horasAtencion = Turno.horarios;
    let element: HTMLElement = document.getElementsByClassName('btn')[0] as HTMLElement;
    element.click();
  }
  onSubmit() :void{
    const form = this.registerData.value;
      if(this.profesional){
        console.log(form.diasSelected);
        console.log(form.horasSelected);
        this.onRegister(new Medico(new Usuario(form.nombre , form.apellido ,
           form.edad,form.email,form.clave,'MEDICO', null),form.especialidadesSelected,null,form.diasSelected,form.horasSelected))
      }else{
        this.onRegister( new Usuario(form.nombre , form.apellido , form.edad,form.email,form.clave,'USER',null));
      }
  }
  onRegister(usuario:Usuario):void{
    const form = this.registerData.value;
    this.authService.register(usuario.mail,usuario.password)
    .then((res)=>
    {
      this.usuarioService.subirImagenes(this.imagenUno, form.email,1);
      this.usuarioService.subirImagenes(this.imagenDos,form.email,2);
      this.usuarioService.crear(usuario);
      this.onLoginRedirect();
    }).catch(err => console.log('error: ' + err.message));
  }

  onLoginRedirect():void{
    this.router.navigate(['']);
  }
  cancelar():void{
    this.onLoginRedirect();
  }
  seleccionoProfesional(){
    this.profesional = !this.profesional;
    
  }

  imagen1(event){
    this.imagenUno = event;
  }

  imagen2(event){
    this.imagenDos = event;
  }


}
