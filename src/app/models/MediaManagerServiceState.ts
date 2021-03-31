import { MediaFile, MediaFolder } from './MediaManagement';

export interface MediaFolderState {
  name: string;
  path: string;
  file_count: number;
  size: 0;
  files: MediaFile[];
  created_at?: string;
  updated_at?: string;
}

export interface MediaManagerServiceState {
  folders: { [key: string]: MediaFolderState };
  rootFolderList: MediaFolder[];
  deleteFile: MediaFile;
}
