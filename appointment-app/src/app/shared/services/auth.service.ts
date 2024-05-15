import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: firebase.default.User | null;
  private asd = 0;

  constructor(private auth: AngularFireAuth) { }

  loginWithEmailPassword(email: any, password: any){
    if (email === null || password === null) throw new Error('Null credentials');

    return this.auth.signInWithEmailAndPassword(email, password);
  }

  register(fllName: string, email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  logout(){
    return this.auth.signOut();
  }

  loggedInUser(){
    return this.auth.user;
  }

  asdF(a: string){
    this.asd++;
    console.log(a, this.asd);
    
  }
}
