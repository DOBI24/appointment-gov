import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fireStore: AngularFirestore) { }

  insertNewUser(user: User) {
    return this.fireStore.collection<User>('Users').doc(user.id).set(user);
  }
}
