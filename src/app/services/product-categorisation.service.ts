import { Injectable } from '@angular/core';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategorisationService {
  categories: Category[];

  constructor() {
    this.categories = [
      new Category({
        id: null,
        label: 'None',
        description: 'Uncategorised',
        productCount: 0,
        value: null
      })
    ];
  }

  getCategories(): Category[] {
    return this.categories;
  }

  addCategory(category: Category): void {
    this.categories.push(category);
  }

  editCategory(category: Category):void {
    this.categories[this.findIndexById(category.id)] = category;
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
