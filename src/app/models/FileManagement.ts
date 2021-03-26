export class FileRequest {
  file: string;

  constructor(initial: string = null) {
    if (initial) {
      this.file = initial;
    } else {
      this.file = '';
    }
  }
}

export interface FileDetail {
  name: string;
  file_type: string;
  folder_items?: FileDetail[];
  size_in_bytes: number;
  created_at?: string;
  updated_at?: string;
}
