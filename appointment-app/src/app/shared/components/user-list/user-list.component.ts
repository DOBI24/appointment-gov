import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../model/user';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = new Array<User>();
  userServiceSubscription?: Subscription;
  displayedColumns: string[] = ['name', 'email', 'role', 'action'];
  roles = ['admin', 'user'];
  editedUser?: User;

  editedUserFormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.pattern("[A-ZÁÉÚŐÓÜÖÍa-záéúőóüöí]+ [A-ZÁÉÚŐÓÜÖÍa-záéúőóüöí ]+")]),
    email: new FormControl('', [Validators.email]),
    role: new FormControl(''),
  });

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userServiceSubscription = this.userService.getAllUser().subscribe((users) => {
      this.users = users;
    });
  }

  ngOnDestroy(): void {
    this.userServiceSubscription?.unsubscribe();
  }

  edit(user: User) {
    if (this.editedUser) this.exitEdit();
    this.editedUser = user;
    this.editedUserFormGroup.get('fullName')?.setValue(user.fullName);
    this.editedUserFormGroup.get('email')?.setValue(user.email);
    this.editedUserFormGroup.get('role')?.setValue(user.role);
  }

  deleteUser(user: User) {
    throw new Error('Method not implemented.');
  }

  save(user: User) {
    if (
      user.fullName === this.editedUserFormGroup.get('fullName')?.value &&
      user.email === this.editedUserFormGroup.get('email')?.value &&
      user.role === this.editedUserFormGroup.get('role')?.value
    ) {
      this.exitEdit();
    }
  }

  exitEdit() {
    this.editedUser = undefined;
  }
}