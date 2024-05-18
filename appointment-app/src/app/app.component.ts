import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { AuthService } from './shared/services/auth.service';
import { CalendarComponent } from './shared/components/calendar/calendar.component';
import { Subscription } from 'rxjs';
import { User } from './shared/model/user';
import { UserService } from './shared/services/user.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        RouterOutlet,
        FooterComponent,
        NavbarComponent,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule,
        FlexLayoutServerModule,
        CalendarComponent
    ]
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'appointment-app';
  open: boolean = false;
  toggleButtonLeft = this.open ? "11.5vw" : "2vw";
  sidenavWidth = "13vw";
  user?: User | null;
  userSubscription: Subscription;

  constructor(private auth: AuthService, private userService: UserService){}

  ngOnInit(): void {
    this.userSubscription = this.auth.loggedInUser().subscribe({
      next: user => {
        this.createUserModel(user);
      },
      error: err => {
        this.auth.user = null;
        this.user = null;
      }
    });
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  
  createUserModel(user: firebase.default.User | null) {
    if (user == null){
      this.user = null;
      this.auth.user = null;  
      return;
    }

    const modelSub = this.userService.getUserByID(user.uid).subscribe({
      next: user => {
        const tempUser = {
          id: user.get("id"),
          fullName: user.get("fullName"),
          email: user.get("email"),
          role: user.get("role")
        }
        this.user = tempUser;
        this.auth.user = tempUser;  
        modelSub.unsubscribe();
      },
      error: err => {
        this.user = null;
        modelSub.unsubscribe();
      }
    })
  }
}

