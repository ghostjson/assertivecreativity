import { FileDetail } from './FileManagement';

export interface FileManagerServiceState {
  files: FileDetail[];
  total_size: number;
}
