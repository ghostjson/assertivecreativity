import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { concatMap, map, take } from 'rxjs/operators';
import { FileRequest } from 'src/app/models/FileManagement';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminFileManagerService {

  constructor(private _http: HttpClient) { }

  private fileLink(): string {
    return `${environment.apiUrl}/admin/file`;
  }

  /**
   * upload file
   * @param file file object to upload
   */
  uploadFile(file: File): Observable<string> {
    return this.convertToBase64(file).pipe(
      take(1),
      concatMap(fileString => {
        // add the necessary headers to file string
        fileString = `data:${file.type};base64,${fileString}`;
        const fileReq = new FileRequest(fileString);
        return this._http.post(`${this.fileLink()}`, fileReq).pipe(
          take(1),
          map((res: any) => {
            return res.url as string;
          })
        );
      })
    )
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
    }

    return result;
  }
}
