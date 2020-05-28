import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged:any = false;

  constructor(private afsAuth: AngularFireAuth) { 
    afsAuth.authState.subscribe(user => (this.isLogged = user));
  }

  register(email:string, pass:string)
  {
    return new Promise((resolve, reject)=>{
      this.afsAuth.createUserWithEmailAndPassword(email,pass)
      .then(userData => resolve(userData),
      err => reject(err));
    })
  }

  loginEmailUser(email:string, pass:string)
  {
    return new Promise((resolve, reject)=>{
      this.afsAuth.signInWithEmailAndPassword(email,pass)
      .then(userData => resolve(userData),
      err => reject(err));
    })
  }

  logoutUser()
  {
    return this.afsAuth.signOut();
  }
}
