import { MediaFile, MediaFolder } from './MediaManagement';

export interface MediaFolderState {
  name: string;
  path: string;
  file_count: number;
  size: 0;
  files: MediaFile[];
  folders: MediaFolder[];
  created_at?: string;
  updated_at?: string;
}

export interface MediaManagerServiceState {
  folders: MediaFolderStateDB;
  root_folder_list: MediaFolder[];
  delete_file: MediaFile;
  delete_folder: MediaFolder;
  folder_list: MediaFolder[];
}

export type MediaFolderStateDB = { [key: string]: MediaFolderState };
