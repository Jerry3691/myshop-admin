import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[noExtraSpaces][ngControl], [noExtraSpaces][ngModel], [noExtraSpaces][formControlName]',
})
export class NoExtraSpacesDirective {

  constructor(private ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: InputEvent): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\s{2,}/g, ' '); // replace 2 or more consecutive spaces with a single space
    this.ngControl.control?.setValue(value);
    input.value = value;
  }

}
