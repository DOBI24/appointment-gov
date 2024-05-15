import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { AuthService } from './shared/services/auth.service';


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
    ]
})
export class AppComponent implements OnInit{
  title = 'appointment-app';
  open: boolean = false;
  toggleButtonLeft = this.open ? "11.5vw" : "2vw";
  sidenavWidth = "13vw";
  user?: firebase.default.User | null;

  constructor(private auth: AuthService){}

  ngOnInit(): void {
    this.auth.loggedInUser().subscribe({
      next: user => {
        this.auth.user = user;
        this.user = user;        
      },
      error: err => {
        this.auth.user = null;
        this.user = null;        
      }
    });
  }
}
