import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "fileTypeReader" })

export class FileTypeReaderPipe implements PipeTransform {
    transform(src: string) {
        const fileType = src.split(";")[0];
        if (
            fileType.includes("png") ||
            fileType.includes("jpg") ||
            fileType.includes("jpeg") ||
            fileType.includes("bmp") ||
            fileType.includes("gif")
        ) {
            return src;
        } else if (fileType.includes("sql")) {
            return "assets/img/sql.webp";
        } else if (fileType.includes("css")) {
            return "assets/img/css.png";
        } else if (fileType.includes("html")) {
            return "assets/img/html.png";
        } else if (fileType.includes("php")) {
            return "assets/img/php.png";
        } else if (fileType.includes("pdf")) {
            return "assets/img/pdf.png";
        } else if (fileType.includes("zip")) {
            return "assets/img/zip.png";
        } else if (fileType.includes("json")) {
            return "assets/img/json.png";
        } else if (fileType.includes("photoshop")) {
            return "assets/img/photoshop.png";
        } else if (fileType.includes("document")) {
            return "assets/img/document.webp";
        } else if (fileType.includes("debian")) {
            return "assets/img/debian.png";
        } else {
            return "assets/img/default-doc.png";
        }
    }
}
