import { FormControl, FormGroupDirective } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class ErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | null): boolean {
        const isSubmitted = form?.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}