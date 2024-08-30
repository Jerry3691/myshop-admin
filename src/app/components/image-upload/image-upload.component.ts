import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-image-upload[fileSelected][formControl]',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent  {
@Input() formControl:FormControl;
  @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.fileSelected.emit(file);

  }
}
