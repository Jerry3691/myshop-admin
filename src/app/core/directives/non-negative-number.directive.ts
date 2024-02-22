// PACKAGES
import { Directive, ElementRef, HostListener, Input } from '@angular/core';



@Directive({
  selector: '[non-negative]'
})
export class NonNegativeNumberDirective {

    @Input() inputValue: number;

    constructor(private el: ElementRef) {}

    @HostListener('input', ['$event']) onInputChange(event) {
      const initialValue = this.el.nativeElement.value;
      this.el.nativeElement.value = initialValue.replace(/[^0-9]/g, '');
      if (this.el.nativeElement.value !== initialValue) {
        event.stopPropagation();
      }
      if (this.inputValue >= 0 || this.el.nativeElement.value >= 0) {
        this.inputValue = this.el.nativeElement.value;
      } else {
        this.el.nativeElement.value = this.inputValue || '';
      }
    }
    @HostListener('keydown', ['$event']) onKeyDown(event:KeyboardEvent) {
      const key = event.key;
      const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
      if (/\D/.test(key) && !allowedKeys.includes(key)) {
        event.preventDefault();
      }
    }
  }
