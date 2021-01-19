import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitLength'
})
export class LimitLengthPipe implements PipeTransform {

  transform(str: string, maxLength: number): string {
    if(str.length <= maxLength) {
      return str;
    }
    else {
      return str.slice(0, maxLength + 1) + '...';
    }
  }
}
