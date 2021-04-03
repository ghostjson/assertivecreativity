import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, map, take, tap } from 'rxjs/operators';
import { MediaFile, MediaFolder } from 'src/app/models/MediaManagement';
import { environment } from 'src/environments/environment';
import { CommonService } from 'src/app/common.service';
import { StateService } from 'src/app/store/state/state.service';
import {
  HOME_FOLDER,
  MediaFolderState,
  MediaFolderStateDB,
  MediaManagerServiceState,
} from 'src/app/models/MediaManagerServiceState';
import { slugify } from 'src/app/library/StringFunctions';
import { compareByPath } from 'src/app/library/CompareFunctions';

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
      delete_file: null,
      delete_folder: null,
      folder_list: [],
      /**
       * TODO: properties like file_count and size should be added from api
       */
      active_folder: HOME_FOLDER,
    });

    // initialise the folders list
    _commonService.setLoaderFor(
      this.refreshFolderPaths()
        .pipe(take(1))
        .subscribe()
        .add(() => {
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
   * return the current state
   * @returns the current state synchronously
   */
  getState(): MediaManagerServiceState {
    return this.state;
  }

  /**
   * get the list of all folders in the media storage
   * @returns list of folders in thee media storage
   */
  refreshFolderPaths(): Observable<MediaFolderState[]> {
    return this._http.get(`${this.folderLink()}`).pipe(
      take(1),
      tap((res: { folder: string }[]) => {
        console.log('folder paths response: ', res);
        /**
         * TODO: Discuss about adding these details in the api
         */
        const folderList = res.map(
          (val): MediaFolderState => {
            const parsedPath = this.parsePath(val.folder);
            return {
              name: this.deSlugify(parsedPath[parsedPath.length - 1]),
              path: val.folder,
              file_count: 0,
              size: 0,
              files: [],
              folders: [],
              visited: 0,
              visited_at: Date.now(),
            };
          }
        );

        // populate the folders hashtable
        const folders: MediaFolderStateDB = {};
        folderList.forEach((item) => {
          folders[item.path] = item;
        });
        console.log('transformed folders: ', folderList);

        // populate the nested folders for each folder path
        Object.keys(folders).forEach((key) => {
          const currFolder = folders[key];
          const parentFolderPath = this.parseParentFolderPath(currFolder.path);
          console.log('parent folder path: ', parentFolderPath);

          const parentFolder = folders[parentFolderPath];
          if (parentFolder && parentFolder.path !== currFolder.path) {
            parentFolder.folders.push(currFolder);
          }
        });

        this.setState({
          folders: folders,
          folder_list: folderList,
        });
      }),
      concatMap(() => {
        return this.select((state) => {
          return state.folder_list;
        });
      })
    );
  }

  /**
   * create an empty folder
   * @param name name of the folder to create
   * @param path path of the folder to create, it is root folder by default
   * @returns observable to create the folder
   */
  createFolder(name: string, path: string = '/'): Observable<MediaFile> {
    const folderName = name.trim();
    const newFolderFile: MediaFile = {
      name: folderName,
      slug: `.${slugify(folderName)}`,
      folder: `${path}${slugify(folderName)}/`,
      // an empty svg is used as a placeholder image
      file:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
    };

    return this.saveFile(newFolderFile).pipe(
      tap((val) => {
        let newFolders: MediaFolderStateDB = {
          ...this.state.folders,
        };

        let newFolder: MediaFolderState = {
          name: val.name,
          path: val.folder,
          file_count: 0,
          size: 0,
          files: [],
          folders: [],
          visited: 0,
          visited_at: Date.now(),
        };
        newFolders[val.folder] = newFolder;

        // add to parent folder
        const parentFolderPath = this.parseParentFolderPath(val.folder);
        newFolders[parentFolderPath].folders.push(newFolder);

        // update the state
        let updatedState = {
          folders: newFolders,
          folder_list: [...this.state.folder_list, newFolder],
        };
        this.setState(updatedState);
      })
    );
  }

  /**
   * set the folder to delete in the store
   * @param folder folder to delete
   */
  setDeleteFolder(folder: MediaFolder): void {
    this.setState({
      delete_folder: folder,
    });
  }

  /**
   * return a delete folder event stream
   * @returns stream to listen for delete events
   */
  deleteFolderStream(): Observable<MediaFolder> {
    return this.select((state) => {
      return state.delete_folder;
    });
  }

  /**
   * delete folder from the store
   * @param folder folder to delete from store
   * @returns returns true if folder was found and deleted, false if failed
   */
  deleteFolderFromStore(folder: MediaFolder): boolean {
    console.log('delete folders from store function');
    const foldersState = { ...this.state.folders };

    if (foldersState[folder.path]) {
      delete foldersState[folder.path];
      // update the state
      const newState: Partial<MediaManagerServiceState> = {
        folders: foldersState,
        folder_list: this.state.folder_list.filter((val) => {
          return val.path !== folder.path;
        }),
        delete_folder: null,
      };

      this.setState(newState);

      return true;
    }

    return false;
  }

  /**
   * delete a folder from the server
   * @param path path of the folder to delete
   * @returns server response
   */
  deleteFolder(path: string): Observable<any> {
    const reqBody = {
      folder: path,
    };
    return this._http
      .request('delete', this.folderLink(), { body: reqBody })
      .pipe(take(1));
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
   * get files of a folder from api and refresh it in the store
   * @param path path to refresh files
   * @returns files in the path
   */
  refreshFilesInFolder(path: string): Observable<MediaFile[]> {
    console.log('refresh files in ', path);
    return this._http
      .post<MediaApiRes<MediaFile[]>>(`${this.folderLink()}`, {
        folder: path,
      })
      .pipe(
        take(1),
        map((res) => {
          return res.data.filter((el) => {
            return el.slug[0] !== '.';
          });
        }),
        tap((res) => {
          let newFoldersState = {
            ...this.state.folders,
          };
          /**
           * TODO: Discuss for including these details in api
           */
          newFoldersState[path] = {
            ...newFoldersState[path],
            visited: newFoldersState[path].visited + 1,
            visited_at: Date.now(),
            file_count: res.length,
            files: res,
          };
          this.setState({
            folders: newFoldersState,
          });
        })
      );
  }

  /**
   * check if a particular slug exist
   * @param slug slug to check existence for
   * @returns boolean which shows the existence of the slug
   */
  isSlugExist(slug: string): Observable<boolean> {
    return this._http.get(`${this.fileLink()}/${slug}/exist`).pipe(
      take(1),
      map((res: { message: string }): boolean => {
        return !res.message.includes('does not');
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
    return this._http.delete(`${this.fileLink()}/${slug}`).pipe(take(1));
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
      delete_file: null,
    });
  }

  /**
   * set the file to delete in the store
   * @param file file to delete
   */
  setDeleteFile(file: MediaFile): void {
    this.setState({
      delete_file: file,
    });
  }

  /**
   * return a delete file event stream
   * @returns stream to listen for delete events
   */
  deleteFileStream(): Observable<MediaFile> {
    return this.select((state) => {
      return state.delete_file;
    });
  }

  /**
   * set the active folder
   * @param folder active folder
   */
  setActiveFolder(folder: MediaFolder): void {
    if (this.state.folders[folder.path]) {
      console.log('set new active folder: ', folder);
      this.setState({
        active_folder: folder,
      });
    }
  }

  /**
   * emit a stream of events which emit when the active folder changes
   * @returns stream active folder change events
   */
  activeFolderStream(): Observable<MediaFolder> {
    return this.select((state) => {
      return state.active_folder;
    }, compareByPath);
  }

  /**
   * get the files and folders at the path
   * @param path path of the folder to get the contents
   * @returns files and folders at the path
   */
  getContentsOfPath(path: string): Observable<MediaFolderState> {
    console.log('get contents of path: ', path);
    return this.select((state) => {
      const cachedFolderContents = state.folders[path];

      if (cachedFolderContents) {
        const now = Date.now();
        const timePassed: number =
          (now - cachedFolderContents.visited_at) / 1000;
        console.log('time passed: ', timePassed);
        if (timePassed > 60 || cachedFolderContents.visited === 0) {
          this.refreshFilesInFolder(path).pipe(take(1)).subscribe();
        }

        return state.folders[path];
      }

      return null;
    });
  }

  /**
   *
   * @param str string to convert to normal string
   * @returns human readable normal string with spaces
   */
  deSlugify(str: string): string {
    return str.replace(/-/g, ' ');
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

  /**
   * parse the path of the parent folder from the folder path
   * @param path path of the folder
   * @returns parent folder path as a string
   */
  parseParentFolderPath(path: string): string {
    // return the root path itself if the path is root
    if (path === '/') {
      return path;
    }

    const parsedPath = this.parsePath(path);

    // remove the last folder in the path as it will be the child folder
    // and convert the rest of the parsed path to path string
    // ['a', 'b', 'c'] --> ['a', 'b'] --> '/a/b/'
    let parentPath = `/${parsedPath.slice(0, parsedPath.length - 1).join('/')}`;
    if (!parentPath.endsWith('/')) {
      parentPath = parentPath + '/';
      console.log('paren path padded: ', parentPath);
    }

    return parentPath;
  }

  /**
   * construct the path from a list of folders
   * @param folderList list of folders in order of hierarchy from left to right
   * @returns path as a string
   */
  constructPath(folderList: string[]): string {
    return folderList.reduce((a, b) => {
      return a + b + '/';
    }, '/');
  }
}
