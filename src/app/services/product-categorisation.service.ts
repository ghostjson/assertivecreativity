import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import { Tag } from '../models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductCategorisationService {
  categories: Category[];
  tags: Tag[];
  tagDB: Object;

  constructor(
    private _http: HttpClient
  ) {
    // categories list 
    this.categories = [
      {
        id: 0,
        label: 'None',
        description: 'Uncategorised',
        productCount: 0,
        value: 'none'
      },
      {
        id: 1,
        label: 'Shirts',
        description: 'This is the shirts category',
        productCount: 0,
        value: 'shirts'
      },
      {
        id: 3,
        label: 'Scarves',
        description: 'This is the scarves category',
        value: 'scarves',
        productCount: 0
      },
      {
        id: 2,
        label: 'Ties',
        description: 'This is the ties category',
        value: 'ties',
        productCount: 0
      }
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
      {
        id: 0,
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
      },
      {
        id: 1,
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
      },
      {
        id: 2,
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
      },
      {
        id: 3,
        label: 'Cashmere Feel',
        value: 'cashmere-feel',
        parentCategory: {
          id: 3,
          label: 'Scarves',
          description: 'This is the scarves category',
          value: 'scarves',
          productCount: 0
        },
        description: 'This contains cashmere scarves',
        productCount: 0
      },
      {
        id: 4,
        label: 'Pashmeena Feel',
        value: 'pashmeena-feel',
        parentCategory: {
          id: 3,
          label: 'Scarves',
          description: 'This is the scarves category',
          value: 'scarves',
          productCount: 0
        },
        description: 'This is Pashmeena Feel scarves',
        productCount: 0
      },
      {
        id: 5,
        label: 'Solid Color Glossy Polyester',
        value: 'solid-color-glossy-polyester',
        parentCategory: {
          id: 3,
          label: 'Scarves',
          description: 'This is the scarves category',
          value: 'scarves',
          productCount: 0
        },
        description: 'This is Solid Color Glossy Polyester scarves',
        productCount: 0
      },
      {
        id: 6,
        label: 'Neck Ties',
        value: 'neck-ties',
        parentCategory: {
          id: 2,
          label: 'Ties',
          description: 'This is the ties category',
          value: 'ties',
          productCount: 0
        },
        description: 'This is the neck tie tag',
        productCount: 0
      },
      {
        id: 7,
        label: 'Bow Tie',
        value: 'bow-tie',
        parentCategory: {
          id: 2,
          label: 'Ties',
          description: 'This is the ties category',
          value: 'ties',
          productCount: 0
        },
        description: 'This is the bow tie tag',
        productCount: 0
      }
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

  getTagsOf(category: string): Observable<any> {
    const BASE_URL: string = 'http://localhost:3000';
    // let tags: Tag[] = this.tagDB[category];

    // set tags to empty array if not found 
    // if (!tags) {
    //   tags = [];
    // }
    // return tags;
    console.info('request url: ', `${BASE_URL}/tags/?parentCategory.value=${category}`);
    return this._http
      .get(`${BASE_URL}/tags/?parentCategory.value=${category}`);
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
