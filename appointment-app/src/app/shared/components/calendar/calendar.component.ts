import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { Subscription } from 'rxjs';
import { Appointment } from '../../model/appointment';
import { TimeFormatPipe } from "../../pipes/time-format.pipe";
import { DayFormatPipe } from "../../pipes/day-format.pipe";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Timestamp } from 'firebase/firestore'
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  imports: [
    CommonModule,
    TimeFormatPipe,
    DayFormatPipe,
    MatIconModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class CalendarComponent implements OnInit, OnDestroy {
  @Output() selectedTimestamp: EventEmitter<Timestamp> = new EventEmitter();
  appointmentSubscription?: Subscription;
  observerSubscriptions?: Subscription;

  times: Array<string> = [
    "8:0",
    "8:30",
    "9:0",
    "9:30",
    "10:0",
    "10:30",
  ];
  days?: Array<Date>;
  appointments: Map<string, Array<string>> = new Map();
  selectedDay: string | null = null;
  transformX: number = 0;
  isMobile: boolean = false;
  lambda: number = 20;

  constructor(
    private appointmentService: AppointmentService,
    private observer: BreakpointObserver,
  ) { }

  ngOnInit(): void {
    this.days = new Array(14);
    for (let i = 0; i < 14; i++) {
      this.days[i] = new Date();
      this.days[i].setDate(this.days[i].getDate() + i);
    }

    this.appointmentSubscription = this.appointmentService.getAllAppointments().subscribe(appointments => {
      appointments.map((appointment: Appointment) => {
        if (!this.appointments.has(appointment.date.toDate().toDateString())) {
          this.appointments.set(appointment.date.toDate().toDateString(), []);
        }
        this.appointments.get(appointment.date.toDate().toDateString())?.push(
          appointment.date.toDate().getHours() + ":" +
          appointment.date.toDate().getMinutes()
        );
      });
    });

    this.observer.observe(['(max-width: 1800px)']).subscribe((screenSize) => {
    });
  }

  ngOnDestroy(): void {
    this.appointmentSubscription?.unsubscribe();
    this.observerSubscriptions?.unsubscribe();
  }

  moveSlider(direction: string) {
    switch (direction) {
      case "left":
        this.transformX += this.lambda;
        break;
      case "right":
        this.transformX -= this.lambda;
        break;
      default:
        break;
    }
  }

  selectDate(selectedDay: any, selectedTime: string) {
    this.selectedDay = selectedDay + "-" + selectedTime;
    this.selectedTimestamp.emit(Timestamp.fromDate(new Date(this.selectedDay)));
  }
}
