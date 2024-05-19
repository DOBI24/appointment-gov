import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { UserListComponent } from "../../shared/components/user-list/user-list.component";
import { AppointmentListComponent } from "../../shared/components/appointment-list/appointment-list.component";

@Component({
    selector: 'app-admin',
    standalone: true,
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
    imports: [MatTabsModule, UserListComponent, AppointmentListComponent]
})
export class AdminComponent {

}
