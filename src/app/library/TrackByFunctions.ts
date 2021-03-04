/**
 * trackby function for ngFor
 * @param index index of the item
 * @param obj object
 */
export function trackById(index: number, obj: any): number {
  return obj.id;
}
