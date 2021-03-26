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

  mediaLink(): string {
    return `${environment.apiUrl}/admin/media`;
  }

  folderLink(): string {
    return `${this.mediaLink()}/folder`;
  }

  fileLink(): string {
    return `${this.mediaLink()}/file`;
  }

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

  getRootFolderList(): Observable<MediaFolder[]> {
    return this.select((state) => {
      return state.rootFolderList;
    });
  }

  getFilesInFolder(path: string): Observable<MediaFile[]> {
    return this.select((state) => {
      return state.folders[path] ? state.folders[path].files : [];
    });
  }

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
  saveFile(
    name: string,
    slug: string,
    folder: string,
    file: File | string
  ): Observable<MediaFile> {
    if (file instanceof File) {
      // if file object is passed, convert it to base64 string first
      return convertToDataUrl(file).pipe(
        take(1),
        concatMap((fileString) => {
          const fileReq: MediaFile = {
            name: name,
            slug: slug,
            folder: folder,
            file: fileString,
          };
          return this._http.post(`${this.mediaLink()}`, fileReq).pipe(
            take(1),
            map((res: { data: MediaFile }) => {
              return res.data;
            })
          );
        })
      );
    } else {
      // else if base64 string is used then directly use it to
      // upload the file
      const fileReq: MediaFile = {
        name: name,
        slug: slug,
        folder: folder,
        file: file,
      };
      return this._http.post(`${this.mediaLink()}`, fileReq).pipe(
        take(1),
        map((res: { data: MediaFile }) => {
          return res.data;
        })
      );
    }
  }

  deSlugify(str: string): string {
    return str.replace(/-/, ' ');
  }

  parseCurrentFolderName(path: string): string {
    const parsedPath = path.split('/');
    return parsedPath[parsedPath.length - 2];
  }
}
