import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, Validators, FormControl, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ErrorMatcher } from '../../shared/model/error-matcher';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  emailError = new ErrorMatcher();
  passwordError = new ErrorMatcher();

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  login() {
    if (this.loginForm.invalid) return;

    this.authService.loginWithEmailPassword(this.loginForm.get("email")?.value as string, this.loginForm.get("password")?.value as string)
      .then((cred) => {
        this.router.navigateByUrl('/main');
      }).catch(err => {
        this.snackBar.open('Hibás e-mail vagy jelszó', 'Elfogad', {
          duration: 3000
        });
      })
  }

  goRegister() {
    this.router.navigateByUrl('/register');
  }
}
