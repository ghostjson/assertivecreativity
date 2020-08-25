import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import { Tag } from '../models/Tag';

@Injectable({
  providedIn: 'root'
})
export class ProductCategorisationService {
  categories: Category[];
  tags: Tag[];
  tagDB: Object;

  constructor() {
    // categories list 
    this.categories = [
      new Category({
        id: null,
        label: 'None',
        description: 'Uncategorised',
        productCount: 0,
        value: 'none'
      })
    ];
    
    // tags dictionary
    this.tagDB = {
      'none': [
        new Tag({
          id: null,
          parentCategory: {
            id: null,
            label: 'None',
            description: 'Uncategorised',
            productCount: 0,
            value: 'none'
          },
          label: 'None',
          description: 'Untagged',
          productCount: 0,
          value: null
        })
      ]
    };

    // tags list
    this.tags = [
      new Tag({
        id: null,
        parentCategory: {
          id: null,
          label: 'None',
          description: 'Uncategorised',
          productCount: 0,
          value: 'none'
        },
        label: 'None',
        description: 'Untagged',
        productCount: 0,
        value: null
      })
    ];
  }

  /**
   * Return all the categories as a list
   */
  getCategories(): Category[] {
    return this.categories;
  }

  /**
   * Add a category to the list
   * @param category Category Object
   */
  addCategory(category: Category): void {
    this.categories.push(category);
  }

  /**
   * Edit an existing category
   * @param category Category Object
   */
  editCategory(category: Category): void {
    this.categories[this.findIndexById(category.id, this.categories)] = category;
  }

  getTags(): Tag[] {
    return this.tags;
  }

  getTagsOf(category: string): Tag[] {
    return this.tagDB[category];
  }

  addTag(tag: Tag): void {
    this.tags.push(tag);
  }

  editTag(tag: Tag): void {
    this.tags[this.findIndexById(tag.id, this.tags)] = tag;
  }

  deleteTag(tag: Tag): void {
    this.tags.splice(this.findIndexById(tag.id, this.tags), 1);
  }

  /**
   * Find the index of category by id
   * @param id Id of the category
   * @param searchList List to search in
   */
  findIndexById(id: string | number, searchList: Tag[] | Category[]): number {
    let index = -1;
    for (let i = 0; i < searchList.length; i++) {
      if (searchList[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
