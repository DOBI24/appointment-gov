import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Appointment } from '../../model/appointment';
import { Subscription } from 'rxjs';
import { AppointmentService } from '../../services/appointment.service';
import { MatTableModule } from '@angular/material/table';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DatePipe } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Case } from '../../model/case';
import { CaseService } from '../../services/case.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    DatePipe,
    MatDatepickerModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  providers: [
    provideNativeDateAdapter(),
  ],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.scss'
})
export class AppointmentListComponent implements OnInit, OnDestroy {
  @Input() filter?: string | null = null;
  appointments: Appointment[] = new Array<Appointment>();
  appointmentServiceSubscription?: Subscription;
  displayedColumns: string[] = ['name', 'case', 'date', 'action'];
  editedAppointment?: Appointment;
  
  cases: Case[];
  caseSubscriptions: Subscription;

  editedAppointmentFormGroup = new FormGroup({
    name: new FormControl('', [Validators.pattern("[A-Za-z]+ [A-Za-z ]+")]),
    case: new FormControl(''),
    date: new FormControl(new Date()),
  })

  constructor(
    private appointmentService: AppointmentService,
    private caseService: CaseService,
    private snackBar: MatSnackBar,
  ) { }
  ngOnInit(): void {
    if (this.filter){
      this.appointmentServiceSubscription = this.appointmentService.getAppointmentsByUserID(this.filter).subscribe((appointments) => {
        this.appointments = appointments;
      });
    }
    else{      
      this.appointmentServiceSubscription = this.appointmentService.getAllAppointments().subscribe((appointments) => {
        this.appointments = appointments;
      });
    }
    this.caseSubscriptions = this.caseService.getAllCases().subscribe((cases) => {
      this.cases = cases;
    });
  }
  
  ngOnDestroy(): void {
    this.appointmentServiceSubscription?.unsubscribe();
    this.caseSubscriptions.unsubscribe();
  }

  deleteAppointment(appointment: Appointment) {
    this.appointmentService.deleteAppointmentByID(appointment.id as string).then(_ => {
      this.snackBar.open('Sikeres törlés', 'Elfogad',{
        duration: 3000
      });
    });
  }
}
