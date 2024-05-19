import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User | null = null;

  constructor(private auth: AngularFireAuth) { }

  loginWithEmailPassword(email: string, password: string) {
    if (email === null || password === null) throw new Error('Null credentials');

    return this.auth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    if (email === null || password === null) throw new Error('Null credentials');

    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  loggedInUser() {
    return this.auth.user;
  }
}
