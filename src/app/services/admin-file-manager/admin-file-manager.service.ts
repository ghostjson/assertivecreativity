import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { concatMap, map, take } from 'rxjs/operators';
import { FileRequest } from 'src/app/models/FileManagement';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminFileManagerService {
  constructor(private _http: HttpClient) {}

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
      return this.convertToDataUrl(file).pipe(
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

  /**
   * convert file object to base64 string
   * @param file file object to convert
   */
  convertToBase64(file: File): Observable<string> {
    const result = new Subject<string>();
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => {
      result.next(btoa(event.target.result.toString()));
      result.complete();
    };

    return result.pipe(take(1));
  }

  /**
   * convert file object to data url for file previewing
   * @param file file object to convert
   */
  convertToDataUrl(file: File): Observable<string> {
    const reader = new FileReader();
    const result = new Subject<string>();

    reader.readAsDataURL(file);
    reader.onload = (event) => {
      result.next(<string>event.target.result);
      result.complete();
    };

    return result.pipe(take(1));
  }
}
