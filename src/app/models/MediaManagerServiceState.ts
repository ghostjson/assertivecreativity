import { MediaFile, MediaFolder } from './MediaManagement';

export interface MediaFolderState {
  name: string;
  path: string;
  file_count?: number;
  size?: number;
  files?: MediaFile[];
  folders?: MediaFolderState[];
  visited?: number;
  visited_at?: number;
  created_at?: string;
  updated_at?: string;
}

export interface MediaManagerServiceState {
  folders: MediaFolderStateDB;
  delete_file: MediaFile;
  delete_folder: MediaFolder;
  folder_list: MediaFolderState[];
  active_folder: MediaFolder;
}

export type MediaFolderStateDB = { [key: string]: MediaFolderState };

export const HOME_FOLDER = {
  name: 'Home',
  path: '/',
  file_count: 0,
  size: 0,
};
