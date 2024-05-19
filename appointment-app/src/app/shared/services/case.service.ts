import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Case } from '../model/case';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  constructor(private fireStore: AngularFirestore) { }

  getAllCases(): Observable<Case[]> {
    return this.fireStore.collection<Case>('Cases', ref => ref.orderBy('name', 'asc')).valueChanges();
  }
}
