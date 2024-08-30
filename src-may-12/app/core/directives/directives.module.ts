import { NgModule } from '@angular/core';
import { NonNegativeNumberDirective } from './non-negative-number.directive';
import { OnlyNumberDirective } from './only-number.directive';
import { OnlyNumber2Directive } from './only-number-2.directive';
import { NoExtraSpacesDirective } from './noExtraSpace.directive';

const data=[
  NonNegativeNumberDirective,
  OnlyNumberDirective,
  OnlyNumber2Directive,
  NoExtraSpacesDirective
]

@NgModule({
  declarations: data,
  imports: [ ],
  exports:data
})
export class DirectivesModule { }
