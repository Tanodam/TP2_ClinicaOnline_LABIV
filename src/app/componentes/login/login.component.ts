import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email:string = '';
  public password:string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  
  onLogin():void{
    this.authService.loginEmailUser(this.email,this.password)
    .then((res)=>
    {
      this.onLoginRedirect();
    }).catch(err => console.log('error: ' + err.message));
  }
 
  onLoginRedirect():void{
    this.router.navigate(['']);
  }
}
