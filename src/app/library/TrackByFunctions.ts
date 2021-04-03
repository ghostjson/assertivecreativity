import { MediaFolder } from '../models/MediaManagement';

/**
 * trackby function for ngFor
 * @param index index of the item
 * @param obj object
 */
export function trackById(index: number, obj: any): number {
  return obj.id;
}

/**
 * trackby function for folders
 * @param folder folder object for use in trackby
 * @returns path of the folder
 */
export function trackByPath(index: number, folder: MediaFolder): string {
  return folder.path;
}
