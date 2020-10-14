import { Category } from './Category';

export class Tag {
  id?: number;
  name: string;
  description?: string;
  category_id: number;

  constructor() {
    this.name = '';
    this.description = '';
    this.category_id = null;
  }
}