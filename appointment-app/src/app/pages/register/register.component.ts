import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../shared/model/user';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { ErrorMatcher } from '../../shared/model/error-matcher';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
  emailError = new ErrorMatcher();
  passwordError = new ErrorMatcher();

  registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.pattern("[A-ZÁÉÚŐÓÜÖÍa-záéúőóüöí]+ [A-ZÁÉÚŐÓÜÖÍa-záéúőóüöí ]+")]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })

  constructor(
    private location: Location,
    private auth: AuthService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  register() {
    if (this.registerForm.invalid) return;

    this.auth.register(this.registerForm.value.email as string, this.registerForm.value.password as string)
      .then(cred => {
        const user: User = {
          id: cred.user?.uid as string,
          fullName: this.registerForm.value.fullName as string,
          email: this.registerForm.value.email as string,
          role: 'user'
        }
        this.userService.insertNewUser(user).then(_ => {
          this.router.navigateByUrl("/main")
        });

      }).catch(err => {
        this.snackBar.open('Hibás adatok', 'Elfogad', {
          duration: 3000
        });
      });

  }

  goBack() {
    this.location.back();
  }
}
