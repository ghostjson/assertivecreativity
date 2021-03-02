import { FormArray, AbstractControl } from '@angular/forms';

/**
 * Move formgroup in a formarray
 * @param formArray formarray to sort
 * @param prevIndex previous index of the item
 * @param currentIndex current index of the item
 */
export function moveItemInFormArray(
  formArray: FormArray,
  prevIndex: number,
  currentIndex: number
): void {
  let item: AbstractControl = formArray.at(prevIndex);
  let insertIndex = currentIndex >= prevIndex ? currentIndex + 1 : currentIndex;
  formArray.insert(insertIndex, item);
  let removeIndex: number =
    currentIndex >= prevIndex ? prevIndex : prevIndex + 1;
  formArray.removeAt(removeIndex);
}

/**
 * Swap two formgroups with each other using their positions
 * @param formArray formarray to sort
 * @param prevIndex previous index of the item
 * @param currentIndex current index of the item
 */
export function swapItemsInFormArray(
  formArray: FormArray,
  prevIndex: number,
  currentIndex: number
): void {
  let itemPrev: AbstractControl = formArray.at(prevIndex);
  let itemCurr: AbstractControl = formArray.at(currentIndex);
  formArray.setControl(prevIndex, itemCurr);
  formArray.setControl(currentIndex, itemPrev);
}
