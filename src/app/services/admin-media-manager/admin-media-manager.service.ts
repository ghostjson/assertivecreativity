import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, map, take, tap } from 'rxjs/operators';
import { MediaFile, MediaFolder } from 'src/app/models/MediaManagement';
import { environment } from 'src/environments/environment';
import { convertToDataUrl } from 'src/app/library/FileFunctions';
import { CommonService } from 'src/app/common.service';
import { StateService } from 'src/app/store/state/state.service';
import { MediaManagerServiceState } from 'src/app/models/MediaManagerServiceState';

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
    });

    console.info('media manager service initialised');

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
          return {
            name: this.deSlugify(this.parseCurrentFolderName(val.folder)),
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
          newFoldersState[path] = {
            name: this.deSlugify(this.parseCurrentFolderName(path)),
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
   * @param str string to convert to normal string
   * @returns human readable normal string with spaces
   */
  deSlugify(str: string): string {
    return str.replace(/-/, ' ');
  }

  /**
   * get the current folder name from
   * @param path path to parse
   * @returns current folder name
   */
  parseCurrentFolderName(path: string): string {
    const parsedPath = path.split('/');
    return parsedPath[parsedPath.length - 2];
  }
}
