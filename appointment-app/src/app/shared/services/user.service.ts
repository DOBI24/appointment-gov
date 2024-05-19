import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fireStore: AngularFirestore) { }

  insertNewUser(user: User) {
    return this.fireStore.collection<User>('Users').doc(user.id).set(user);
  }

  getAllUser(): Observable<User[]> {
    return this.fireStore.collection<User>('Users').valueChanges();
  }

  getUserByID(id: string) {
    return this.fireStore.collection<User>('Users').doc(id).get();
  }

  updateUserByID(id: string, user: User) {
    return this.fireStore.collection<User>('Users').doc(id).update(user);
  }

  deleteUserByID(id: string) {
    return this.fireStore.collection<User>('Users').doc(id).delete();
  }
}
