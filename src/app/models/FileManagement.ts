export class FileRequest {
  file: string;

  constructor(initial: string = null) {
    if(initial) {
      this.file = initial;
    }
    else {
      this.file = '';
    }
  }
}