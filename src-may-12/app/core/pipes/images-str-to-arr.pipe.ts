import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "imagesStrToArr" })

export class ImagesStrToArrPipe implements PipeTransform {
    transform(images: string) {
      return images.split(",");
    }
}
