import { Category } from './Category';

export class Tag {
  id: number | string;
  parentCategory: Category;
  label: string;
  description: string;
  productCount: number;
  value: string;

  constructor(initial: Tag=null) {
    if (initial !== null) {
      this.id = initial.id;
      this.parentCategory = initial.parentCategory;
      this.label = initial.label;
      this.description = initial.description;
      this.productCount = initial.productCount;
      this.value = initial.value;
    }
  }
}