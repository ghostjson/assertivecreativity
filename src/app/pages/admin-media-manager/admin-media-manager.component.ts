import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  collapseAnimation,
  fadeInOnEnterAnimation,
  fadeOutAnimation,
  fadeOutOnLeaveAnimation,
} from 'angular-animations';
import { MenuItem, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Subject } from 'rxjs';
import {
  concatMap,
  filter,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { CommonService } from 'src/app/common.service';
import { convertToDataUrl } from 'src/app/library/FileFunctions';
import { slugify } from 'src/app/library/StringFunctions';
import { trackByPath } from 'src/app/library/TrackByFunctions';
import { MediaFile } from 'src/app/models/MediaManagement';
import {
  HOME_FOLDER,
  MediaFolderState,
  RenameFolderDetails,
} from 'src/app/models/MediaManagerServiceState';
import { MenuItemClickEvent } from 'src/app/models/PrimeNgEvents';
import { AdminMediaManagerService } from 'src/app/services/admin-media-manager/admin-media-manager.service';

@Component({
  selector: 'app-admin-media-manager',
  templateUrl: './admin-media-manager.component.html',
  styleUrls: ['./admin-media-manager.component.scss'],
  animations: [
    collapseAnimation({ duration: 250 }),
    fadeOutAnimation({ duration: 250 }),
    fadeOutOnLeaveAnimation({ duration: 250 }),
    fadeInOnEnterAnimation({ duration: 250 }),
  ],
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
  folderRenameMode: boolean;
  renameFolder: RenameFolderDetails;
  createNewMenuItems: MenuItem[];
  closeUploadDialog: Subject<void>;
  componentDestroy: Subject<void>;
  activeFolderPath: string;
  activeFolderName: string;
  home: MenuItem;
  breadcrumbMenu: MenuItem[];
  trackByPath = trackByPath;
  validDropFile: boolean;
  invalidDropFile: boolean;
  dragOver: boolean;
  filesLoading: boolean;
  searchMode: boolean = false;

  @ViewChild('mediaUpload', { static: true }) mediaUpload: FileUpload;

  constructor(
    private _mediaMgrService: AdminMediaManagerService,
    private _commonService: CommonService,
    private _messageService: MessageService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.closeUploadDialog = new Subject<void>();
    this.componentDestroy = new Subject<void>();
  }

  ngOnInit(): void {
    console.log('media manager init');
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
      command: (event: MenuItemClickEvent) => {
        if (event.item.automationId.path !== this.activeFolderPath) {
          this._mediaMgrService.setActiveFolder({
            name: 'Home',
            path: event.item.automationId.path,
          });
        }
      },
    };
    this.breadcrumbMenu = [];

    // check if the active folder is provided in the url
    const queryParams = this._activatedRoute.snapshot.queryParams;
    if (queryParams && queryParams.folder) {
      this.activeFolderName = this._mediaMgrService
        .parsePath(queryParams.folder)
        .slice(-1)[0];
      this.activeFolderPath = queryParams.folder;
      this._mediaMgrService.setActiveFolder({
        name: this.activeFolderName,
        path: this.activeFolderPath,
      });
    }

    // update the active folder as the folder in the url changes
    this._activatedRoute.queryParams
      .pipe(
        filter((res) => {
          return res.folder ? res.folder !== this.activeFolderPath : true;
        }),
        takeUntil(this.componentDestroy)
      )
      .subscribe((res) => {
        console.log('query params changed: ', res, this.activeFolderPath);
        if (res.folder) {
          this._mediaMgrService.setActiveFolder({
            name: this._mediaMgrService.parsePath(res.folder).slice(-1)[0],
            path: res.folder,
          });
        } else {
          this._mediaMgrService.setActiveFolder(HOME_FOLDER);
        }
      });

    // initialise the folder contents
    this.initFolderContentManager();

    // intialise folder rename manager
    this.initFolderRenameManager();

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
   * initalise the folder rename manager
   */
  initFolderRenameManager(): void {
    this._mediaMgrService
      .renameFolderStream()
      .pipe(takeUntil(this.componentDestroy))
      .subscribe((res) => {
        this.folderRenameMode = true;
        this.renameFolder = res;
        this.showNewFolderDialog();
      });
  }

  /**
   * initiliaze the contents of the current folder and update the folder
   * contents as the currently active folder changes
   */
  initFolderContentManager(): void {
    this._mediaMgrService
      .activeFolderStream()
      .pipe(
        tap((activeFolder) => {
          // update the active folder state
          this.activeFolderName = activeFolder.name;
          this.activeFolderPath = activeFolder.path;

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

            // update the url to reflect current folder
            this._router.navigate([], {
              relativeTo: this._activatedRoute,
              queryParams: {
                folder: this.activeFolderPath,
              },
              queryParamsHandling: 'merge',
            });
          } else {
            this.breadcrumbMenu = [];
            this._router.navigate([], {
              relativeTo: this._activatedRoute,
            });
          }
        }),
        switchMap((activeFolder) => {
          return this._mediaMgrService.getContentsOfPath(activeFolder.path);
        }),
        takeUntil(this.componentDestroy)
      )
      .subscribe((res) => {
        // update the files and folders in the current active path
        this.files = res.files;
        this.folders = res.folders;
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
   * handle drag events fired when image is dragged over the image uploader
   * @param event drag event emitted when image is dragged over
   */
  dragOverHandler(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = true;

    if (
      event.dataTransfer.items.length === 1 &&
      event.dataTransfer.items[0].type.includes('image')
    ) {
      this.validDropFile = true;
      this.invalidDropFile = false;
    } else {
      this.validDropFile = false;
      this.invalidDropFile = true;
    }
  }

  /**
   * handle when dragged file leaves the drop target area
   * @param event event fired when image dragged leaves the target drag area
   */
  dragEndHandler(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = false;
    this.validDropFile = false;
    this.invalidDropFile = false;
  }

  /**
   * handle when the file is dropped in the upload manager
   * @param event drag event emitted when the image is dropped in the drag area
   */
  fileDropHandler(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.validDropFile) {
      this.convertMedia([event.dataTransfer.files[0]]);
    } else {
      this._messageService.add({
        severity: 'error',
        summary: 'File dropped is not supported',
        detail: 'Images are the only supported files',
      });
    }

    this.dragOver = false;
    this.validDropFile = false;
    this.invalidDropFile = false;
  }

  /**
   * clear the selected image
   */
  clearSelectedMedia(): void {
    this.newMedia.get('file').reset();
    this.mediaUpload.clear();
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
   * create or rename a folder in the current active folder
   */
  saveFolder(): void {
    if (this.folderRenameMode) {
      this.folderRenameMode = false;
      const newPath: string = `${this._mediaMgrService.parseParentFolderPath(
        this.renameFolder.old_path
      )}${slugify(this.newFolder.value.name)}/`;
      this._commonService.setLoaderFor(
        this._mediaMgrService
          .renameFolder(this.renameFolder.old_path, newPath)
          .subscribe((res) => {
            this._mediaMgrService.renameFolderStore(
              this.renameFolder.old_path,
              newPath
            );
            this.hideNewFolderDialog();
          })
      );
    } else {
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

  /**
   * search the media for the string in event
   * @param event searchbar search event
   */
  searchMedia(event: string): void {
    this.filesLoading = true;

    this._mediaMgrService
      .searchInFolder(event, this.activeFolderPath)
      .subscribe((res) => {
        this.searchMode = true;
        this.files = res;
        this.filesLoading = false;
      });
  }

  /**
   * disable search mode, reverting to listing files
   */
  disableSearchMode(): void {
    this.filesLoading = true;

    this._mediaMgrService
      .getContentsOfPath(this.activeFolderPath)
      .pipe(take(1))
      .subscribe((res) => {
        this.files = res.files;
        this.folders = res.folders;
        this.filesLoading = false;
        this.searchMode = false;
      });
  }
}
