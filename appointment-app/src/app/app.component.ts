import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
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
import { CookieService } from 'ngx-cookie-service';
import { BreakpointObserver } from '@angular/cdk/layout';

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
  user?: User | null;
  userSubscription: Subscription;
  isMobile: boolean = false;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router,
    private observer: BreakpointObserver,
  ){}

  ngOnInit(): void {
    this.userSubscription = this.auth.loggedInUser().subscribe({
      next: user => {
        this.createUserModel(user);
      },
      error: err => {
        this.auth.user = null;
        this.user = null;
        this.cookieService.delete("user");
      }
    });
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
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
      this.cookieService.delete("user");
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
        this.cookieService.set("user", tempUser.id);
        this.user = tempUser;
        this.auth.user = tempUser;
        modelSub.unsubscribe();
      },
      error: err => {
        this.user = null;
        modelSub.unsubscribe();
      }
    });
  }
}

