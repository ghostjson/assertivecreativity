export class MediaFile {
  name: string;
  slug: string;
  folder: string;
  file: string;

  constructor(initial: MediaFile) {
    if (initial) {
      this.name = initial.name;
      this.slug = initial.slug;
      this.folder = initial.folder;
      this.file = initial.file;
    } else {
      this.name = '';
      this.slug = '';
      this.folder = '';
      this.file = '';
    }
  }
}

export class MediaFolder {
  name: string;
  path: string;
  file_count: number;
  size: number;
  created_at?: string;
  updated_at?: string;
}
