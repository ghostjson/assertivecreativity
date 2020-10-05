import { Category } from './Category';

export class Tag {
  id?: number;
  name: string;
  description?: string;
  parentCategory: Category;

  constructor(initial: Tag=null) {
    if (initial !== null) {
      this.id = initial.id;
      this.parentCategory = initial.parentCategory;
      this.description = initial.description;
    }
  }
}