import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppointmentListComponent } from '../../../shared/components/appointment-list/appointment-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [MatTabsModule, AppointmentListComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit, OnDestroy{
  filter: string | null = null;
  routeSubscriptions?: Subscription;

  constructor(private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.routeSubscriptions = this.route.params.subscribe(params => {
      this.filter = params['id'];
      console.log(this.filter);
      
    });
    
    // this.filter = 
    // throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.routeSubscriptions?.unsubscribe();
  }
}
