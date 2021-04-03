import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Subject } from 'rxjs';
import {
  concatMap,
  filter,
  mergeMap,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { CommonService } from 'src/app/common.service';
import { convertToDataUrl } from 'src/app/library/FileFunctions';
import { slugify } from 'src/app/library/StringFunctions';
import { trackByPath } from 'src/app/library/TrackByFunctions';
import { MediaFile } from 'src/app/models/MediaManagement';
import {
  HOME_FOLDER,
  MediaFolderState,
} from 'src/app/models/MediaManagerServiceState';
import { MenuItemClickEvent } from 'src/app/models/PrimeNgEvents';
import { AdminMediaManagerService } from 'src/app/services/admin-media-manager/admin-media-manager.service';

@Component({
  selector: 'app-admin-media-manager',
  templateUrl: './admin-media-manager.component.html',
  styleUrls: ['./admin-media-manager.component.scss'],
})
export class AdminMediaManagerComponent implements OnInit, OnDestroy {
  folders: MediaFolderState[] = [];
  files: MediaFile[] = [];
  filePreviewVisible: boolean;
  uploadMediaVisible: boolean;
  createFolderVisible: boolean;
  previewFile: MediaFile;
  newMedia: FormGroup;
  newFolder: FormGroup;
  createNewMenuItems: MenuItem[];
  closeUploadDialog: Subject<void>;
  componentDestroy: Subject<void>;
  activeFolderPath: string;
  home: MenuItem;
  breadcrumbMenu: MenuItem[];
  trackByPath = trackByPath;

  @ViewChild('mediaUpload', { static: true }) mediaUpload: FileUpload;

  constructor(
    private _mediaMgrService: AdminMediaManagerService,
    private _commonService: CommonService,
    private _messageService: MessageService
  ) {
    this.closeUploadDialog = new Subject<void>();
    this.componentDestroy = new Subject<void>();
  }

  ngOnInit(): void {
    this.filePreviewVisible = false;
    this.uploadMediaVisible = false;
    this.newMedia = new FormGroup({
      name: new FormControl('', [Validators.required]),
      slug: new FormControl('', [Validators.required]),
      folder: new FormControl('/', [Validators.required]),
      file: new FormControl('', [Validators.required]),
    });
    this.newFolder = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

    this.createNewMenuItems = [
      {
        label: 'Folder',
        icon: 'pi pi-folder',
        command: () => {
          this.showNewFolderDialog();
        },
      },
      {
        label: 'File',
        icon: 'pi pi-file',
        command: () => {
          this.showUploadMediaDialog();
        },
      },
    ];

    // initialise the breadcrumb menu
    this.home = {
      label: 'Home',
      automationId: {
        path: '/',
      },
      routerLink: '/admin/media/',
      command: (event: MenuItemClickEvent) => {
        console.log('breadcrumb clicked: ', event);
        if (event.item.automationId.path !== this.activeFolderPath) {
          this._mediaMgrService.setActiveFolder({
            name: 'Home',
            path: event.item.automationId.path,
          });
        }
      },
    };
    this.breadcrumbMenu = [];

    // initialise the folder contents
    this.activeFolderPath = '/';
    this.initFolderContentManager();

    // listen for delete file events and delete them
    this.initFileDeleteManager();

    // listen for delete folder events and delete them
    this.initFolderDeleteManager();
  }

  ngOnDestroy(): void {
    // reset the active folder to home folder when the component is destroyed
    this._mediaMgrService.setActiveFolder(HOME_FOLDER);
    this.closeUploadDialog.next();
    this.closeUploadDialog.complete();
    this.componentDestroy.next();
    this.componentDestroy.complete();
  }

  /**
   * initiliaze the contents of the current folder and update the folder
   * contents as the currently active folder changes
   */
  initFolderContentManager(): void {
    this._mediaMgrService
      .activeFolderStream()
      .pipe(
        switchMap((activeFolder) => {
          this.activeFolderPath = activeFolder.path;
          console.log('map function: ', activeFolder, this.activeFolderPath);
          // update the breadcrumb if the path is not root
          if (activeFolder.path !== '/') {
            const parsedPath = this._mediaMgrService.parsePath(
              this.activeFolderPath
            );
            this.breadcrumbMenu = parsedPath.map(
              (el, index): MenuItem => {
                return {
                  label: this._mediaMgrService.deSlugify(el),
                  automationId: {
                    path: this._mediaMgrService.constructPath(
                      parsedPath.slice(0, index + 1)
                    ),
                  },
                  disabled: index === parsedPath.length - 1,
                  command: (event: MenuItemClickEvent) => {
                    console.log('breadcrumb clicked: ', event);
                    if (
                      event.item.automationId.path !== this.activeFolderPath
                    ) {
                      this._mediaMgrService.setActiveFolder({
                        name: el,
                        path: event.item.automationId.path,
                      });
                    }
                  },
                };
              }
            );
            console.log('breadcrumb: ', this.breadcrumbMenu);
          } else {
            this.breadcrumbMenu = [];
          }

          return this._mediaMgrService.getContentsOfPath(activeFolder.path);
        }),
        takeUntil(this.componentDestroy)
      )
      .subscribe((res) => {
        console.log('contents of active folder fetched: ', res);
        if (res) {
          // update the files and folders in the current active path
          this.files = res.files;
          this.folders = res.folders;
        }
      });
  }

  /**
   * start listening for file delete events and manage them
   */
  initFileDeleteManager(): void {
    this._mediaMgrService
      .deleteFileStream()
      .pipe(
        takeUntil(this.componentDestroy),
        filter((res) => {
          return res != null;
        }),
        concatMap((fileToDelete) => {
          this._commonService.setLoader(true);
          this._mediaMgrService.deleteFileFromStore(fileToDelete);
          return this._mediaMgrService.deleteFile(fileToDelete.slug);
        })
      )
      .subscribe(
        () => {
          this._commonService.setLoader(false);
          this._messageService.add({
            severity: 'success',
            summary: 'File Deleted',
            detail: 'Media file was deleted',
          });
        },
        () => {
          this._commonService.setLoader(false);
          this._messageService.add({
            severity: 'error',
            summary: 'Something went wrong',
            detail: 'Media file could not be deleted',
          });
        }
      );
  }

  /**
   * start listening for folder delete events and manage them
   */
  initFolderDeleteManager(): void {
    this._mediaMgrService
      .deleteFolderStream()
      .pipe(
        takeUntil(this.componentDestroy),
        filter((res) => {
          return res != null;
        }),
        concatMap((folderToDelete) => {
          this._commonService.setLoader(true);
          // delete from local store
          this._mediaMgrService.deleteFolderFromStore(folderToDelete);
          return this._mediaMgrService.deleteFolder(folderToDelete.path);
        })
      )
      .subscribe(
        (res) => {
          this._commonService.setLoader(false);
          this._messageService.add({
            severity: 'success',
            summary: 'Folder Deleted',
            detail: 'Folder was deleted',
          });
        },
        () => {
          this._commonService.setLoader(false);
          this._messageService.add({
            severity: 'error',
            summary: 'Something went wrong',
            detail: 'Folder could not be deleted',
          });
        }
      );
  }

  /**
   * show the media file preview dialog
   * @param file file to preview
   */
  showFilePreview(file: MediaFile): void {
    this.filePreviewVisible = true;
    this.previewFile = file;
  }

  /**
   * hide media file preview dialog
   */
  hideFilePreview(): void {
    this.filePreviewVisible = false;
    this.previewFile = null;
  }

  /**
   * show the upload media dialog
   */
  showUploadMediaDialog(): void {
    this.uploadMediaVisible = true;
    // update slug as the name input changes
    const nameField = <FormControl>this.newMedia.get('name');
    const slugField = <FormControl>this.newMedia.get('slug');

    // set the current active folder
    this.newMedia.get('folder').setValue(this.activeFolderPath);

    nameField.valueChanges
      .pipe(takeUntil(this.closeUploadDialog))
      .subscribe((changes: string) => {
        slugField.setValue(slugify(changes));
      });
  }

  /**
   * hide the upload media dialog
   */
  hideUploadMediaDialog(): void {
    this.uploadMediaVisible = false;
    this.mediaUpload.clear();
    this.newMedia.reset();
    this.closeUploadDialog.next();
  }

  /**
   * convert files to data url
   * @param files files to convert to data url
   */
  convertMedia(files: File[]): void {
    convertToDataUrl(files[0]).subscribe((res) => {
      this.newMedia.patchValue({
        file: res,
      });
    });
  }

  /**
   * update the slug as the filename changes
   * @param fileName name of the file
   * @param formControl formcontrol to update the slug
   */
  updateSlug(fileName: string, formControl: FormControl): void {
    formControl.setValue(slugify(fileName));
  }

  /**
   * upload new media file
   */
  uploadMedia(): void {
    const newFile: MediaFile = this.newMedia.value;
    this._commonService.setLoaderFor(
      this._mediaMgrService
        .isSlugExist(newFile.slug)
        .pipe(
          filter((res) => {
            return !res;
          }),
          concatMap(() => {
            return this._mediaMgrService.saveFile(newFile);
          })
        )
        .subscribe(
          (res) => {
            this._mediaMgrService
              .refreshFilesInFolder(this.activeFolderPath)
              .subscribe((res) => {
                this.hideUploadMediaDialog();
                this._messageService.add({
                  severity: 'success',
                  summary: 'File Uploaded',
                  detail: 'Media file uploaded',
                });
              });
          },
          (error: HttpErrorResponse) => {
            switch (error.statusText.toLowerCase()) {
              case 'conflict':
                const slugField = <FormControl>this.newMedia.get('slug');
                slugField.markAsDirty();
                slugField.setErrors({
                  notUnique: true,
                });
                this._messageService.add({
                  severity: 'error',
                  summary: 'Slug Already Exist',
                  detail: 'Try changing the slug to a different one',
                });
                break;

              default:
                this._messageService.add({
                  severity: 'error',
                  summary: 'Something went wrong',
                  detail: 'Try Again',
                });
            }
          }
        )
    );
  }

  /**
   * show the dialog to create new folder
   */
  showNewFolderDialog(): void {
    this.createFolderVisible = true;
  }

  /**
   * hide the dialog to create new folder
   */
  hideNewFolderDialog(): void {
    this.createFolderVisible = false;
    this.newFolder.reset();
  }

  /**
   * create a new folder in the current active folder
   */
  createFolder(): void {
    const newFolderDetails: {
      name: string;
    } = this.newFolder.value;

    this._commonService.setLoaderFor(
      this._mediaMgrService
        .createFolder(newFolderDetails.name, this.activeFolderPath)
        .subscribe(() => {
          this.hideNewFolderDialog();
        })
    );
  }
}
