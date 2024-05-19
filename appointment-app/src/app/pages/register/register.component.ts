import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../shared/model/user';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

export class ErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | null): boolean {
    const isSubmitted = form?.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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

  constructor(
    private formBuilder: FormBuilder,
    private location : Location,
    private auth : AuthService,
    private userService: UserService,
    private router : Router,
  ) {}

  registerForm = new FormGroup({
    fullName : new FormControl('', [Validators.required, Validators.pattern("[A-ZÁÉÚŐÓÜÖÍa-záéúőóüöí]+ [A-ZÁÉÚŐÓÜÖÍa-záéúőóüöí ]+")]),
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(8)]),
  })

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
        console.log(err);
      });

  }

  goBack() {
    this.location.back();
  }
}
