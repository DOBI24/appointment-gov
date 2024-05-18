import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Appointment } from '../model/appointment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private fireStore: AngularFirestore) { }

  insertAppointment(appointment: Appointment){
    appointment.id = this.fireStore.createId();
    return this.fireStore.collection<Appointment>('Appointments').doc(appointment.id).set(appointment);
  }

  getAllAppointments(): Observable<Appointment[]> {
    return this.fireStore.collection<Appointment>('Appointments').valueChanges();
  }

}