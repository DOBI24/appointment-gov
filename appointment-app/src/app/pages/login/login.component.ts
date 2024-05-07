import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { User } from '../../shared/model/user';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';

export class EmailError implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | null): boolean {
    const isSubmitted = form?.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class PasswordError implements ErrorStateMatcher{
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
  emailError = new EmailError();
  passwordError = new PasswordError();
  
  constructor(private formBuilder: FormBuilder) { }

  loginForm = this.createForm(
    {
      fullName: '',
      email: '',
      password: ''
    }
  )

  createForm(model: User) {
    let formGroup = this.formBuilder.group(model);
    formGroup.get('fullName')?.addValidators([Validators.required, Validators.pattern("[A-Za-z]+\s[A-Za-z]+")])
    formGroup.get('email')?.addValidators([Validators.required, Validators.email])
    formGroup.get('password')?.addValidators([Validators.required, Validators.minLength(8)])
    return formGroup;
  }

  login() {
    if (this.loginForm.invalid) return;
    console.log(this.loginForm.value);
  }
}
