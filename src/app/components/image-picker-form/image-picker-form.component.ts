import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { AdminFileManagerService } from 'src/app/services/admin-file-manager/admin-file-manager.service';

@Component({
  selector: 'app-image-picker-form',
  templateUrl: './image-picker-form.component.html',
  styleUrls: ['./image-picker-form.component.scss'],
})
export class ImagePickerFormComponent implements OnInit {
  @Input() formTitle: string;
  @Input() imageForm: FormGroup;
  @Input() styleClass: string;

  @ViewChild('imgFilePicker') imgFilePicker: FileUpload;

  imgFullScrPreview: boolean;

  constructor(private _fileManagerService: AdminFileManagerService) {}

  ngOnInit(): void {
    console.log('image form received: ', this.imageForm.value);
  }

  /**
   * handle image selection and from the file upload component
   * @param event event object from file upload component
   */
  onImgSelect(event: any): void {
    console.log(event);

    this._fileManagerService
      .convertToDataUrl(event.currentFiles[0])
      .subscribe((dataUrl) => {
        this.imageForm.patchValue({
          src: dataUrl,
        });
      });
  }

  /**
   * clear the selected image from the file upload component
   */
  clearSelectedImg(): void {
    this.imgFilePicker.clear();
    console.log('clearing image: ', this.imageForm.get('src').value);
    this.imageForm.get('src').reset();
  }

  /**
   * toggle fullscreen preview of the selected image
   */
  toggleFullScrPreview(): void {
    this.imgFullScrPreview = !this.imgFullScrPreview;
  }
}
