import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FileStoreObj, FileStoreState } from 'src/app/models/FileStoreState';
import { StateService } from '../state/state.service';

@Injectable({
  providedIn: 'root',
})
export class FileStoreService extends StateService<FileStoreState> {
  constructor() {
    const intialSate: FileStoreState = {
      files: {},
    };
    console.log('file service initialised');

    super(intialSate);
  }

  /**
   * add file to the store
   * @param file file to cache in the store
   */
  add(file: FileStoreObj): void {
    let newState: FileStoreState = {
      ...this.state,
    };
    newState.files[file.id] = file;

    this.setState(newState);
  }

  /**
   * get file from the store async
   * @param id id of the file to get
   */
  get(id: number): Observable<FileStoreObj> {
    return this.select((state) => {
      const result = state.files[id];
      return result ? result : null;
    }).pipe(take(1));
  }

  /**
   * update a file in the store
   * @param file file to update
   */
  update(file: FileStoreObj): void {
    let newState = {
      ...this.state,
    };
    newState.files[file.id] = file;

    this.setState(newState);
  }

  /**
   * remove a file from store
   * @param id id of the file to remove
   */
  remove(id: number): void {
    let newState = this.state;

    delete newState.files[id];
    this.setState(newState);
  }
}
