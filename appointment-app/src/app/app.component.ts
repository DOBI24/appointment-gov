import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FlexLayoutServerModule} from '@angular/flex-layout/server';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, FooterComponent, NavbarComponent, MatSidenavModule, MatButtonModule, MatIconModule, FlexLayoutModule, FlexLayoutServerModule]
})
export class AppComponent {
  title = 'appointment-app';
  opened: boolean = false;
}
