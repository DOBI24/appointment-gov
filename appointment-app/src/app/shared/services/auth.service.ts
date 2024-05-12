import { Injectable } from '@angular/core';
import { AuthCredential, UserCredential } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  loginWithEmailPassword(email: any, password: any){
    if (email === null || password === null) throw new Error('Null credentials');

    return this.auth.signInWithEmailAndPassword(email, password);
  }

  register(fllName: string, email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
}
