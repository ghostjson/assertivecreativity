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
        id: 0,
        label: 'None',
        description: 'Uncategorised',
        productCount: 0,
        value: 'none'
      }),
      new Category({
        id: 1,
        label: 'Shirts',
        description: 'This is the shirts category',
        productCount: 0,
        value: 'shirts'
      }),
      new Category({
        id: 2,
        label: 'Pants',
        description: 'This is the pants category ',
        productCount: 0,
        value: 'pants'
      }),
      new Category({
        id: 3,
        label: 'Night Wear',
        description: 'This is the night wear category',
        productCount: 0,
        value: 'night-wear'
      })
    ];
    
    // tags dictionary
    this.tagDB = {
      'none': [
        new Tag({
          id: null,
          parentCategory: {
            id: 0,
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
      ],
      'shirts': [
        new Tag({
          id: 0,
          parentCategory: {
            id: 1,
            label: 'Shirts',
            description: 'This is the shirts category',
            productCount: 0,
            value: 'shirts'
          },
          label: 'Sleeveless',
          description: 'Tag for sleeveless shirts',
          productCount: 0,
          value: 'sleeveless'
        }),
        new Tag({
          id: 1,
          parentCategory: {
            id: 1,
            label: 'Shirts',
            description: 'This is the shirts category',
            productCount: 0,
            value: 'shirts'
          },
          label: 'Sleeved',
          description: 'Tag for sleeved shirts',
          productCount: 0,
          value: 'sleeved'
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
      }),
      new Tag({
        id: 0,
        parentCategory: {
          id: 1,
          label: 'Shirts',
          description: 'This is the shirts category',
          productCount: 0,
          value: 'shirts'
        },
        label: 'Sleeveless',
        description: 'Tag for sleeveless shirts',
        productCount: 0,
        value: 'sleeveless'
      }),
      new Tag({
        id: 1,
        parentCategory: {
          id: 1,
          label: 'Shirts',
          description: 'This is the shirts category',
          productCount: 0,
          value: 'shirts'
        },
        label: 'Sleeved',
        description: 'Tag for sleeved shirts',
        productCount: 0,
        value: 'sleeved'
      })
    ];
  }

  /**
   * Return all the categories as a list
   */
  getCategories(): Category[] {
    return this.categories.slice();
  }

  /**
   * Add a category to the list
   * @param category Category Object
   */
  addCategory(category: Category): void {
    this.categories.push(category);

    // create the tag DB for this category 
    this.tagDB[category.value] = [];
    console.log('category added: ', this.categories, this.tagDB);
  }

  /**
   * Edit an existing category
   * @param category Category Object
   */
  editCategory(category: Category): void {
    this.categories[this.findIndexById(category.id, this.categories)] = category;
  }
  
  deleteCategory(category: Category): void {
    this.categories.splice(this.findIndexById(category.id, this.categories), 1);
  }

  getTags(): Tag[] {
    return this.tags.slice();
  }

  getTagsOf(category: string): Tag[] {
    let tags: Tag[] = this.tagDB[category];

    // set tags to empty array if not found 
    if (!tags) {
      tags = [];
    }
    
    return tags;
  }

  addTag(tag: Tag): void {
    this.tags.push(tag);
    // update tag DB 
    this.tagDB[tag.parentCategory.value].push(tag);
    console.log('tag added: ', this.tags, this.tagDB);
  }

  editTag(tag: Tag): void {
    this.tags[this.findIndexById(tag.id, this.tags)] = tag;
    
    let dbList: Tag[] = this.tagDB[tag.parentCategory.value];
    dbList[this.findIndexById(tag.id, dbList)] = tag;

    console.log('tag DB updated: ', this.tagDB);
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
