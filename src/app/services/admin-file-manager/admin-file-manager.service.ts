import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, map, take } from 'rxjs/operators';
import { convertToDataUrl } from 'src/app/library/FileFunctions';
import { FileRequest } from 'src/app/models/FileManagement';
import { FileManagerServiceState } from 'src/app/models/FileManagerServiceState';
import { StateService } from 'src/app/store/state/state.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminFileManagerService extends StateService<FileManagerServiceState> {
  constructor(private _http: HttpClient) {
    super({
      files: [],
      total_size: 0,
    });

    // initialise the file details
    this.setState({
      files: [
        {
          name: 'File one',
          file_type: 'generic',
          size_in_bytes: 2450,
        },
        {
          name: 'File two',
          file_type: 'generic',
          size_in_bytes: 2450,
        },
        {
          name: 'File three',
          file_type: 'generic',
          size_in_bytes: 2450,
        },
        {
          name: 'File four',
          file_type: 'generic',
          size_in_bytes: 2450,
        },
        {
          name: 'File five',
          file_type: 'generic',
          size_in_bytes: 2450,
        },
        {
          name: 'File six',
          file_type: 'generic',
          size_in_bytes: 2450,
        },
        {
          name: 'File seven',
          file_type: 'generic',
          size_in_bytes: 2450,
        },
        {
          name: 'File one',
          file_type: 'generic',
          size_in_bytes: 2450,
        },
        {
          name: 'File one',
          file_type: 'generic',
          size_in_bytes: 2450,
        },
        {
          name: 'File one',
          file_type: 'generic',
          size_in_bytes: 2450,
        },
        {
          name: 'File one',
          file_type: 'generic',
          size_in_bytes: 2450,
        },
        {
          name: 'File one',
          file_type: 'generic',
          size_in_bytes: 2450,
        },
        {
          name: 'File one',
          file_type: 'generic',
          size_in_bytes: 2450,
        },
        {
          name: 'File one',
          file_type: 'generic',
          size_in_bytes: 2450,
        },
      ],
    });
  }

  /**
   * return the file api endpoint
   * @returns link of the file api endpoint
   */
  private fileLink(): string {
    return `${environment.apiUrl}/admin/file`;
  }

  /**
   * upload file or base64 string
   * @param file file object or bass64 string to upload
   */
  uploadFile(file: File | string): Observable<string> {
    if (file instanceof File) {
      // if file object is passed, convert it to base64 string first
      return convertToDataUrl(file).pipe(
        take(1),
        concatMap((fileString) => {
          const fileReq = new FileRequest(fileString);
          return this._http.post(`${this.fileLink()}`, fileReq).pipe(
            take(1),
            map((res: any) => {
              return res.url as string;
            })
          );
        })
      );
    } else {
      // else if base64 string is used then directly use it to
      // upload the file
      const fileReq = new FileRequest(file);
      return this._http.post(`${this.fileLink()}`, fileReq).pipe(
        take(1),
        map((res: any) => {
          return res.url as string;
        })
      );
    }
  }
}
