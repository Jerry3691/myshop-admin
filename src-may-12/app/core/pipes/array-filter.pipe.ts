import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "arrayFilter",
})
export class ArrayFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter((it) => {
      return it.category.toLocaleLowerCase().includes(searchText);
    });
  }
}
