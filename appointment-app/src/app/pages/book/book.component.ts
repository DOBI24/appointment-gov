import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInput,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  basicFormGroup = new FormGroup({
    name : new FormControl('', [Validators.required, Validators.pattern("[A-Za-z]+ [A-Za-z ]+")]),
    case : new FormControl('', [Validators.required])
  })
}
