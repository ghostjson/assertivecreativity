import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

/**
 * convert file object to base64 string
 * @param file file object to convert
 */
export function convertToBase64(file: File): Observable<string> {
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
export function convertToDataUrl(file: File): Observable<string> {
  const reader = new FileReader();
  const result = new Subject<string>();

  reader.readAsDataURL(file);
  reader.onload = (event) => {
    result.next(<string>event.target.result);
    result.complete();
  };

  return result.pipe(take(1));
}
