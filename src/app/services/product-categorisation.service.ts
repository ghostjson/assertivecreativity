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
  API_URL: string = 'http://localhost:3000';

  constructor(
    private _http: HttpClient
  ) {}
  
  /**
   * Return the categories url
   */
  categoriesUrl(): string {
    return `${this.API_URL}/categories`;
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
    return `${this.API_URL}/tags`;
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
  getCategories(): Observable<any> {
    return this._http.get(`${this.categoriesUrl()}`);
  }

  /**
   * Add a category to the list
   * @param category Category Object
   */
  addCategory(category: Category): Observable<any> {
    return this._http.post(`${this.categoriesUrl()}`, category);
  }

  /**
   * Edit an existing category
   * @param category Category Object
   */
  editCategory(category: Category): Observable<any> {
    return this._http.put(`${this.categoryUrlById(category.id)}`, category);
  }
  
  /**
   * Delete category
   * @param category Category Object to delete
   */
  deleteCategory(category: Category): Observable<any> {
    return this._http.delete(`${this.categoryUrlById(category.id)}`);
  }

  /**
   * Get tags from  
   */
  getTags(): Observable<any> {
    return this._http.get(`${this.tagsUrl()}`);
  }

  /** 
   * Get tags of a category 
  */
  getTagsOf(category: string): Observable<any> {
    return this._http
      .get(`${this.tagsUrl()}/?parentCategory.value=${category}`);
  }

  /**
   * Add tag 
   * @param tag Tag object to add
   */
  addTag(tag: Tag): Observable<any> {
    return this._http.post(`${this.tagsUrl()}`, tag);
  }

  /**
   * Edit tag on the server
   * @param tag Tag object to edit
   */
  editTag(tag: Tag): Observable<any> {
    return this._http.put(`${this.tagUrlById(tag.id)}`, tag);
  }

  /**
   * Delete tag from the server
   * @param tag Tag object to delete
   */
  deleteTag(tag: Tag): Observable<any> {
    return this._http.delete(`${this.tagUrlById(tag.id)}`);
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
