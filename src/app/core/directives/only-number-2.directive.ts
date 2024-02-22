import { Input, SimpleChanges } from '@angular/core';
import { Directive, ElementRef, HostListener, OnChanges } from '@angular/core';

@Directive({
  selector: '[onlyNumber2]',
})
export class OnlyNumber2Directive implements OnChanges {
  private hasDecimalPoint = false;
  private hasPlus = false;
  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste',
  ];
  @Input() plus = false;
  @Input() plusSymbol = '+';
  @Input() decimal = false;
  @Input() decimalSeparator = '.';
  @Input() min = -Infinity;
  @Input() max = Infinity;
  @Input() pattern?: string | RegExp;
  @Input() plusAtStart = false; // new input property
  private regex!: RegExp | null;
  inputElement: HTMLInputElement;

  constructor(public el: ElementRef) {
    this.inputElement = el.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pattern']) {
      this.regex = this.pattern ? RegExp(this.pattern) : null;
    }

    if (changes['min']) {
      const maybeMin = Number(this.min);
      this.min = isNaN(maybeMin) ? -Infinity : maybeMin;
    }

    if (changes['max']) {
      const maybeMax = Number(this.max);
      this.max = isNaN(maybeMax) ? Infinity : maybeMax;
    }

    if (changes['plusAtStart']) {
      this.hasPlus = false; // reset hasPlus when plusAtStart changes
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): any {
    if (
      this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
      ((e.key === 'a' || e.code === 'KeyA') && e.ctrlKey === true) || // Allow: Ctrl+A
      ((e.key === 'c' || e.code === 'KeyC') && e.ctrlKey === true) || // Allow: Ctrl+C
      ((e.key === 'v' || e.code === 'KeyV') && e.ctrlKey === true) || // Allow: Ctrl+V
      ((e.key === 'x' || e.code === 'KeyX') && e.ctrlKey === true) || // Allow: Ctrl+X
      ((e.key === 'a' || e.code === 'KeyA') && e.metaKey === true) || // Allow: Cmd+A (Mac)
      ((e.key === 'c' || e.code === 'KeyC') && e.metaKey === true) || // Allow: Cmd+C (Mac)
      ((e.key === 'v' || e.code === 'KeyV') && e.metaKey === true) || // Allow: Cmd+V (Mac)
      ((e.key === 'x' || e.code === 'KeyX') && e.metaKey === true) // Allow: Cmd+X (Mac)
    ) {
      // let it happen, don't do anything
      return;
    }

    let newValue = '';

    if (this.decimal && e.key === this.decimalSeparator) {
      newValue = this.forecastValue(e.key);
      if (newValue.split(this.decimalSeparator).length > 2) {
        // has two or more decimal points
        e.preventDefault();
        return;
      } else {
        this.hasDecimalPoint = newValue.indexOf(this.decimalSeparator) > -1;
        return; // Allow: only one decimal point
      }
    }

    if (this.plus && e.key === this.plusSymbol) {
      if (this.plusAtStart && this.inputElement.selectionStart !== 0) {
        e.preventDefault(); // first character must be "+"
        return;
      }
      newValue = this.forecastValue(e.key);
      if (newValue.split(this.plusSymbol).length > 2) {
        // has two or more plus signs
        e.preventDefault();
        return;
      } else {
        this.hasPlus = newValue.indexOf(this.plusSymbol) > -1;
        return;
      }
    }

    if (e.key?.length === 1 && !/\d/.test(e.key)) {
      // Allow: only digits
      e.preventDefault();
      return;
    }

    newValue = this.forecastValue(e.key);

    if (
      this.min.toString().length > 0 &&
      Number(newValue) < Number(this.min.toString())
    ) {
      e.preventDefault();
      return;
    }

    if (
      this.max.toString().length > 0 &&
      Number(newValue) > Number(this.max.toString())
    ) {
      e.preventDefault();
      return;
    }

    if (this.regex && !this.regex.test(newValue)) {
      e.preventDefault();
      return;
    }
  }

  private forecastValue(key: string): string {
    let text = '';
  
    // Check if there is any selected text
    if (this.inputElement.selectionStart || this.inputElement.selectionStart === 0) {
      const start = this.inputElement.selectionStart;
      const end = this.inputElement.selectionEnd;
  
      // Construct a new string by concatenating the text before the selection start position,
      // the new key that has been pressed, and the text after the selection end position
      text = this.inputElement.value.slice(0, start) + key + this.inputElement.value.slice(end as number);
    } else {
      // If there is no selected text, append the new key to the end of the existing text
      text = this.inputElement.value + key;
    }
  
    // Replace non-plus symbol with "+" if `hasPlus` is true
    if (this.hasPlus && this.plusSymbol !== '+') {
      text = text.replace(new RegExp(`\\${this.plusSymbol}`, 'g'), '+');
    }
  
    // Replace non-dot separator with "." if `decimal` is true
    if (this.decimal && this.decimalSeparator !== '.') {
      text = text.replace(new RegExp(`\\${this.decimalSeparator}`, 'g'), '.');
    }
  
    return text;
  }
  
}
