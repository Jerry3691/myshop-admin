import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  constructor(private datePipe:DatePipe){}
  transform(value: string): string {
    const formattedDateTime = value.replace('T', ' ').substring(0, 16);
    let d=new Date(formattedDateTime)
// console.log(this.datePipe.transform(d,'dd/MM/yyyy, hh:mm a'))
let nfdt=this.datePipe.transform(d,'dd/MM/yyyy, hh:mm a')
    return nfdt;
      }
    }


