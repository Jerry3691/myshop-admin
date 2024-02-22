import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "statusName",
})
export class GetStatusNamePipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1: return 'Approve';
      case 2: return 'Decline';
      case 3: return 'Pending';
      default: return 'N/A';
    }

  }
}
