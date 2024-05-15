import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, Validators, FormControl, FormGroupDirective, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';


export class ErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | null): boolean {
    const isSubmitted = form?.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
  
  constructor(private router : Router, private authService : AuthService) { }

  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(8)]),
  })

  login() {
    if (this.loginForm.invalid) return;
    
    this.authService.loginWithEmailPassword(this.loginForm.get("email")?.value, this.loginForm.get("password")?.value)
      .then((cred) => {
        console.log(cred);
      }).catch(err => {
        console.log(err);
      })
  }

  goRegister() {
    this.authService.logout();
    // this.router.navigateByUrl('/register');
  }
}
