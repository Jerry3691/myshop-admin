import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortData'
})
export class SortDataPipe implements PipeTransform {

  transform(value: any[]): unknown {
    let data = value.sort((a, b) => a.value - b.value);
    return data;
  }

}
