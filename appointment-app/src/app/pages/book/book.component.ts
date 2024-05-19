import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CaseService } from '../../shared/services/case.service';
import { Case } from '../../shared/model/case';
import { MatCardModule } from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CalendarComponent } from "../../shared/components/calendar/calendar.component";
import { Subscription } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';
import { AppointmentService } from '../../shared/services/appointment.service';
import { AuthService } from '../../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-book',
    standalone: true,
    providers: [
        provideNativeDateAdapter()
    ],
    templateUrl: './book.component.html',
    styleUrl: './book.component.scss',
    imports: [
        MatStepperModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInput,
        MatSelectModule,
        MatButtonModule,
        MatCardModule,
        MatDatepickerModule,
        CalendarComponent
    ]
})
export class BookComponent implements OnInit, OnDestroy{
  cases: Case[];
  caseSubscriptions: Subscription;

  basicFormGroup = new FormGroup({
    name : new FormControl('', [Validators.required, Validators.pattern("[A-ZÁÉÚŐÓÜÖÍa-záéúőóüöí]+ [A-ZÁÉÚŐÓÜÖÍa-záéúőóüöí ]+")]),
    case : new FormControl('', [Validators.required])
  });
  selectedTimestamp: Timestamp | null = null;

  constructor(
    private caseService: CaseService,
    private appointmentService: AppointmentService,
    private authService: AuthService,
    ) {}

  ngOnInit(): void {
    this.caseSubscriptions = this.caseService.getAllCases().subscribe((cases) => {
      this.cases = cases;
    });    
  }

  ngOnDestroy(): void {
    this.caseSubscriptions.unsubscribe();
  }

  bookAppointment() {
    if (this.basicFormGroup.invalid || this.selectedTimestamp == null) return;

    const appointment = {
      name: this.basicFormGroup.value.name as string,
      case: this.basicFormGroup.value.case as string,
      date: this.selectedTimestamp,
      userID: this.authService.user?.id as string
    };
    this.appointmentService.insertAppointment(appointment).then(_ => {
      this.selectedTimestamp = null;
    }).catch(err => {
      console.log(err);
    })
  }

  changeSelectedTimestamp(selectedTimestamp: Timestamp) {    
    this.selectedTimestamp = selectedTimestamp;
  }
}
