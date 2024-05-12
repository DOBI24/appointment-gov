import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../shared/model/user';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../../shared/services/auth.service';

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

  constructor(private formBuilder: FormBuilder, private location : Location, private auth : AuthService) { }

  registerForm = this.createForm(
    {
      fullName: '',
      email: '',
      password: ''
    }
  )

  createForm(model: User) {
    let formGroup = this.formBuilder.group(model);
    formGroup.get('fullName')?.addValidators([Validators.required, Validators.pattern("[A-Za-z]+ [A-Za-z ]+")])
    formGroup.get('email')?.addValidators([Validators.required, Validators.email])
    formGroup.get('password')?.addValidators([Validators.required, Validators.minLength(8)])
    return formGroup;
  }

  register() {
    if (this.registerForm.invalid) return;

    this.auth.register(this.registerForm.value.fullName ?? '', this.registerForm.value.email ?? '', this.registerForm.value.password ?? '')
      .then(cred => {
        this.auth.loginWithEmailPassword(this.registerForm.value.email, this.registerForm.value.password).then(cred => {
          this.goBack();
        }).catch(err => {
          console.log(err);
        });
      }).catch(err => {
        console.log(err);
      });

  }

  goBack() {
    this.location.back();
  }
}
