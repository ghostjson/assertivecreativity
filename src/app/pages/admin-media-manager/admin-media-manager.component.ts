import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/common.service';
import { convertToDataUrl } from 'src/app/library/FileFunctions';
import { slugify } from 'src/app/library/StringFunctions';
import { MediaFile, MediaFolder } from 'src/app/models/MediaManagement';
import { AdminMediaManagerService } from 'src/app/services/admin-media-manager/admin-media-manager.service';

@Component({
  selector: 'app-admin-media-manager',
  templateUrl: './admin-media-manager.component.html',
  styleUrls: ['./admin-media-manager.component.scss'],
})
export class AdminMediaManagerComponent implements OnInit, OnDestroy {
  folders: Observable<MediaFolder[]>;
  files: Observable<MediaFile[]>;
  filePreviewVisible: boolean;
  uploadMediaVisible: boolean;
  previewFile: MediaFile;
  newMedia: FormGroup;
  componentDestroy: Subject<void>;

  @ViewChild('mediaUpload', { static: true }) mediaUpload: FileUpload;

  constructor(
    private _mediaMgrService: AdminMediaManagerService,
    private _commonService: CommonService,
    private _messageService: MessageService
  ) {
    this.componentDestroy = new Subject<void>();
  }

  ngOnInit(): void {
    this.folders = this._mediaMgrService.getRootFolderList();
    this.files = this._mediaMgrService.getFilesInFolder('/');
    this.filePreviewVisible = false;
    this.uploadMediaVisible = false;
    this.newMedia = new FormGroup({
      name: new FormControl('', [Validators.required]),
      slug: new FormControl('', [Validators.required]),
      folder: new FormControl('/', [Validators.required]),
      file: new FormControl('', [Validators.required]),
    });

    // update slug as the name input changes
    const nameField = <FormControl>this.newMedia.get('name');
    const slugField = <FormControl>this.newMedia.get('slug');

    nameField.valueChanges
      .pipe(takeUntil(this.componentDestroy))
      .subscribe((changes: string) => {
        console.log('changes: ', changes);
        slugField.setValue(slugify(changes));
      });
  }

  ngOnDestroy(): void {
    this.componentDestroy.next();
    this.componentDestroy.complete();
  }

  /**
   * show the media file preview dialog
   * @param file file to preview
   */
  showFilePreview(file: MediaFile): void {
    console.log('before setting: ', this.filePreviewVisible);
    this.filePreviewVisible = true;
    this.previewFile = file;
    console.log('media file: ', file, this.filePreviewVisible);
  }

  /**
   * hide media file preview dialog
   */
  hideFilePreview(): void {
    this.filePreviewVisible = false;
    this.previewFile = null;
  }

  showUploadMediaDialog(): void {
    this.uploadMediaVisible = true;
  }

  hideUploadMediaDialog(): void {
    this.uploadMediaVisible = false;
    this.mediaUpload.clear();
    this.newMedia.reset();
  }

  convertMedia(files: File[]): void {
    console.log('files: ', files);
    convertToDataUrl(files[0]).subscribe((res) => {
      this.newMedia.patchValue({
        file: res,
      });
    });
  }

  updateSlug(str: string, formControl: FormControl): void {
    formControl.setValue(slugify(str));
  }

  uploadMedia(): void {
    console.log('media uploading: ', this.newMedia.value);
    this._commonService.setLoaderFor(
      this._mediaMgrService.saveFile(<MediaFile>this.newMedia.value).subscribe(
        (res) => {
          console.log('image uploaded: ', res);
          this._mediaMgrService.refreshFilesInFolder('/').subscribe((res) => {
            this.hideUploadMediaDialog();
            this._messageService.add({
              severity: 'success',
              summary: 'File Uploaded',
              detail: 'Media file uploaded',
            });
          });
        },
        () => {
          this._messageService.add({
            severity: 'error',
            summary: 'Something went wrong',
            detail: 'Try Again',
          });
        }
      )
    );
  }
}
