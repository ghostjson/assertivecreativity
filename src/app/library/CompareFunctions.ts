import { MediaFolder } from '../models/MediaManagement';

/**
 * compare to folder objects by path
 * @param a first object to compare
 * @param b second object to compare
 * @returns true if both are equal and false if not
 */
export function compareByPath(a: MediaFolder, b: MediaFolder): boolean {
  // check for cases where either of the args is null
  return !(a && b) ? true : a.path === b.path;
}

export function compareById(a: any, b: any): boolean {
  // check for cases where either of the args is null
  return !(a && b) ? true : a.id === b.id;
}
