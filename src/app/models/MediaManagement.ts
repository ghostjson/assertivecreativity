export class MediaFile {
  name: string;
  slug: string;
  folder: string;
  file: string;
  size?: number;
  created_at?: string;
  updated_at?: string;
}

export class MediaFolder {
  name: string;
  path: string;
  file_count?: number;
  size?: number;
  created_at?: string;
  updated_at?: string;
}
