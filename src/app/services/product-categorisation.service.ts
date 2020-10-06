import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import { Tag } from '../models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductCategorisationService {
  API_URL: string;
  // API_URL: string = 'http://3.129.34.125/mock-api';

  constructor(
    private _http: HttpClient
  ) {}
  
  /**
   * Return the categories url
   */
  categoriesUrl(): string {
    return `${environment.apiUrl}/products/categories`;
  }

  /**
   * Return url of a category using id
   * @param id id of the tag
   */
  categoryUrlById(id: number) {
    return `${this.categoriesUrl()}/${id}`
  }

  /**
   * Return the tags url
   */
  tagsUrl(): string {
    return `${environment.apiUrl}/tags`;
  }

  /**
   * Return url of the tag using id
   * @param id id of the tag
   */
  tagUrlById(id: number): string {
    return `${this.tagsUrl()}/${id}`;
  }

  /**
   * Return all the categories as a list
   */
  getCategories(): Observable<Category[]> {
    return this._http.get<Category[]>(`${this.categoriesUrl()}/get`)
      .pipe(
        take(1),
        map((categories: any) => {
          return categories.data.map((category: Category) => {
            return {
              ...category,
              value: category.id
            }
          });
        })
      );
  }

  /**
   * Add a category to the list
   * @param category Category Object
   */
  addCategory(category: Category): Observable<any> {
    return this._http.post(`${this.categoriesUrl()}/create`, category)
      .pipe(take(1));
  }

  /**
   * Edit an existing category
   * @param category Category Object
   */
  editCategory(category: Category): Observable<any> {
    return this._http.post(`${this.categoryUrlById(category.id)}`, category)
      .pipe(take(1));
  }
  
  /**
   * Delete category
   * @param category Category Object to delete
   */
  deleteCategory(category: Category): Observable<any> {
    return this._http.delete(`${this.categoryUrlById(category.id)}`)
      .pipe(take(1));
  }

  /**
   * Get tags from  
   */
  getTags(): Observable<any> {
    return this._http.get(`${this.tagsUrl()}`)
      .pipe(take(1));
  }

  /** 
   * Get tags of a category 
  */
  getTagsOf(category: number): Observable<any> {
    return this._http
      .get(`${this.tagsUrl()}/?parentCategory.id=${category}`)
        .pipe(take(1));
  }

  /**
   * Add tag 
   * @param tag Tag object to add
   */
  addTag(tag: Tag): Observable<any> {
    return this._http.post(`${this.tagsUrl()}`, tag)
      .pipe(take(1));
  }

  /**
   * Edit tag on the server
   * @param tag Tag object to edit
   */
  editTag(tag: Tag): Observable<any> {
    return this._http.post(`${this.tagUrlById(tag.id)}`, tag)
      .pipe(take(1));
  }

  /**
   * Delete tag from the server
   * @param tag Tag object to delete
   */
  deleteTag(tag: Tag): Observable<any> {
    return this._http.delete(`${this.tagUrlById(tag.id)}`)
      .pipe(take(1));
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
