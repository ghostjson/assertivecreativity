import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, map, take, tap } from 'rxjs/operators';
import { MediaFile, MediaFolder } from 'src/app/models/MediaManagement';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/common.service';
import { StateService } from 'src/app/store/state/state.service';
import {
  MediaFolderState,
  MediaManagerServiceState,
} from 'src/app/models/MediaManagerServiceState';

type MediaApiRes<T> = {
  data: T;
};

@Injectable({
  providedIn: 'root',
})
export class AdminMediaManagerService extends StateService<MediaManagerServiceState> {
  constructor(
    private _http: HttpClient,
    private _commonService: CommonService
  ) {
    super({
      folders: {},
      rootFolderList: [],
      deleteFile: null,
    });

    // initialise the folders list
    _commonService.setLoaderFor(
      this.refreshRootFolderPaths()
        .pipe(take(1))
        .subscribe()
        .add(() => {
          console.log('initialise the file list in root folder');
          // initialise the file list in root folder
          this.refreshFilesInFolder('/').subscribe();
        })
    );
  }

  /**
   * return the media api link
   * @returns media api link
   */
  mediaLink(): string {
    return `${environment.apiUrl}/admin/media`;
  }

  /**
   * return folder api link
   * @returns folder api link
   */
  folderLink(): string {
    return `${this.mediaLink()}/folder`;
  }

  /**
   * return file api link
   * @returns file api link
   */
  fileLink(): string {
    return `${this.mediaLink()}/file`;
  }

  /**
   * refresh the files in root folder from the api
   * @returns files in root folder
   */
  refreshRootFolderPaths(): Observable<MediaFolder[]> {
    return this._http.get(`${this.folderLink()}`).pipe(
      take(1),
      tap((res: { folder: string }[]) => {
        /**
         * TODO: Discuss about adding these details in the api
         */
        const transformedRes = res.map((val) => {
          const parsedPath = this.parsePath(val.folder);
          return {
            name: this.deSlugify(parsedPath[parsedPath.length - 1]),
            path: val.folder,
            file_count: 0,
            size: 0,
          };
        });

        const folders = {};
        transformedRes.forEach((item) => {
          folders[item.path] = {
            name: item.name,
            file_count: 0,
            size: 0,
            files: [],
          };
        });
        this.setState({
          folders: folders,
        });

        // set folders list
        this.setState({
          rootFolderList: transformedRes.filter((val) => {
            return val.path !== '/';
          }),
        });
      }),
      concatMap(() => {
        return this.getRootFolderList();
      })
    );
  }

  /**
   * get files in root folder
   * @returns files in root folder
   */
  getRootFolderList(): Observable<MediaFolder[]> {
    return this.select((state) => {
      return state.rootFolderList;
    });
  }

  /**
   * get files in a folder
   * @param path path to fetch files in
   * @returns files in folder
   */
  getFilesInFolder(path: string): Observable<MediaFile[]> {
    return this.select((state) => {
      return state.folders[path] ? state.folders[path].files : [];
    });
  }

  /**
   *
   * @param path path to refresh files
   * @returns files in the path
   */
  refreshFilesInFolder(path: string): Observable<MediaFile[]> {
    return this._http
      .post<MediaApiRes<MediaFile[]>>(`${this.folderLink()}`, {
        folder: path,
      })
      .pipe(
        take(1),
        tap((res) => {
          let newFoldersState = {
            ...this.state.folders,
          };
          /**
           * TODO: Discuss for including these details in api
           */
          const parsedPath = this.parsePath(path);
          console.log('paths: ', parsedPath);
          newFoldersState[path] = {
            name: this.deSlugify(parsedPath[parsedPath.length - 1]),
            path: path,
            size: 0,
            file_count: 0,
            files: res.data,
          };
          this.setState({
            folders: newFoldersState,
          });
        }),
        map((res) => {
          return res.data;
        })
      );
  }

  /**
   * upload file or base64 string
   * @param file file object or bass64 string to upload
   */
  saveFile(file: MediaFile): Observable<MediaFile> {
    return this._http.post(`${this.mediaLink()}`, file).pipe(
      take(1),
      map((res: { data: MediaFile }) => {
        return res.data;
      })
    );
  }

  /**
   *
   * @param slug slug of the file to be deleted
   * @returns
   */
  deleteFile(slug: string): Observable<any> {
    return this._http.delete(`${this.fileLink()}/${slug}`);
  }

  /**
   * delete file from the store
   * @param file file to delete
   */
  deleteFileFromStore(file: MediaFile): void {
    const parsedPath = this.parsePath(file.folder);

    const foldersState = { ...this.state.folders };
    let currentFolder: MediaFolderState = foldersState[parsedPath[0]];
    // find the folder in which the file is in and remove it
    for (let i = 1; i < parsedPath.length; i += 1) {
      const path = parsedPath[i];
      if (!currentFolder[path]) {
        break;
      }
      currentFolder = currentFolder[path];
    }

    if (currentFolder) {
      currentFolder.files = currentFolder.files.filter((el) => {
        return el.slug !== file.slug;
      });
    }

    // update the state
    this.setState({
      folders: foldersState,
      deleteFile: null,
    });
  }

  /**
   * set the file to delete in the store
   * @param file file to delete
   */
  setDeleteFile(file: MediaFile): void {
    this.setState({
      deleteFile: file,
    });
  }

  /**
   * return a delete file event stream
   * @returns stream to listen for delete events
   */
  deleteFileStream(): Observable<MediaFile> {
    return this.select((state) => {
      return state.deleteFile;
    });
  }

  /**
   *
   * @param str string to convert to normal string
   * @returns human readable normal string with spaces
   */
  deSlugify(str: string): string {
    return str.replace(/-/, ' ');
  }

  /**
   * get the folders list from path
   * @param path path to parse
   * @returns folder list
   */
  parsePath(path: string): string[] {
    // add '/' before and after path if it is not present
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    if (!path.endsWith('/')) {
      path = path + '/';
    }

    if (path.length <= 1) {
      return ['/'];
    }

    const parsedPath = path.split('/');
    return parsedPath.filter((val) => {
      return val.length;
    });
  }
}
