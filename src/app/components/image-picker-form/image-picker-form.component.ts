import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { AdminFileManagerService } from 'src/app/services/admin-file-manager/admin-file-manager.service';
import { convertToDataUrl } from 'src/app/library/FileFunctions';
import { IdGeneratorService } from 'src/app/services/id-generator.service';

@Component({
  selector: 'app-image-picker-form',
  templateUrl: './image-picker-form.component.html',
  styleUrls: ['./image-picker-form.component.scss'],
})
export class ImagePickerFormComponent {
  @Input() formTitle: string;
  @Input() imageForm: FormGroup;
  @Input() styleClass: string;

  @ViewChild('imgFilePicker') imgFilePicker: FileUpload;

  imgFullScrPreview: boolean;

  constructor(private _idGenService: IdGeneratorService) {}

  /**
   * handle image selection and from the file upload component
   * @param event event object from file upload component
   */
  onImgSelect(event: any): void {
    if (event.currentFiles[0]) {
      convertToDataUrl(event.currentFiles[0]).subscribe((dataUrl) => {
        this.imageForm.patchValue({
          id: this._idGenService.getId(),
          src: dataUrl,
        });
      });
    }
  }

  /**
   * clear the selected image from the file upload component
   */
  clearSelectedImg(): void {
    this.imgFilePicker.clear();
    this.imageForm.patchValue({
      id: null,
      src: null,
    });
  }

  /**
   * toggle fullscreen preview of the selected image
   */
  toggleFullScrPreview(): void {
    this.imgFullScrPreview = !this.imgFullScrPreview;
  }
}
