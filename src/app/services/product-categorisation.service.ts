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
  constructor(
    private _http: HttpClient
  ) {}

  /**
   * Return stock products url
   */
  stockProductsUrl(): string {
    return `${environment.apiUrl}/products/stock`;
  }

  /**
   * custom products url
   */
  customProductsUrl(): string {
    return `${environment.apiUrl}/products/custom`;
  }

  /**
   * Return stock categories url
   */
  stockCategoriesUrl(): string { 
    return `${this.stockProductsUrl()}/categories`;
  }
  
  /**
   * Return the categories url
   */
  customCategoriesUrl(): string {
    return `${this.customProductsUrl()}/categories`;
  }

  /**
   * Return url of a category using id
   * @param id id of the tag
   */
  customCategoryUrlById(id: number) {
    return `${this.customCategoriesUrl()}/${id}`;
  }

  /**
   * 
   * @param id id of the 
   */
  tagsOfCustomCategoryUrl(id: number): string {
    return `${this.customCategoriesUrl()}/tags/${id}`
  }

  /**
   * Return the tags url
   */
  customTagsUrl(): string {
    return `${this.customProductsUrl()}/tags`;
  }

  /**
   * Return url of the tag using id
   * @param id id of the tag
   */
  customTagUrlById(id: number): string {
    return `${this.customTagsUrl()}/${id}`;
  }

  customTagUrl(): string {
    return `${this.customProductsUrl()}/tag`;
  }

  /**
   * Return all the categories as a list
   */
  getCategories(): Observable<Category[]> {
    return this._http.get<Category[]>(`${this.customCategoriesUrl()}`)
      .pipe(
        take(1),
        map((res: any) => {
          return res.data as Category[];
        })
      );
  }

  getStockCategories(): Observable<Category[]> {
    return this._http.get<string[]>(`${this.stockCategoriesUrl()}`)
      .pipe(
        take(1),
        map((categories: string[]) => {
          return categories.map((category: string, index: number): Category => {
            return {
              id: index,
              name: category,
              value: category
            };
          });
        })
      );
  }

  /**
   * Add a category to the list
   * @param category Category Object
   */
  addCategory(category: Category): Observable<Category> {
    return this._http.post<Category>(`${this.customCategoriesUrl()}`, category)
      .pipe(take(1));
  }

  /**
   * Edit an existing category
   * @param category Category Object
   */
  editCategory(category: Category): Observable<any> {
    return this._http.post(`${this.customCategoryUrlById(category.id)}`, category)
      .pipe(take(1));
  }
  
  /**
   * Delete category
   * @param category Category Object to delete
   */
  deleteCategory(category: Category): Observable<any> {
    return this._http.delete(`${this.customCategoryUrlById(category.id)}`)
      .pipe(take(1));
  }

  /**
   * Get tags  
   */
  getTags(): Observable<Tag[]> {
    return this._http.get<Tag[]>(`${this.customTagsUrl()}`)
      .pipe(
        take(1),
        map((tags: any) => {
          return tags.data;
        })
      );
  }

  /** 
   * Get tags of a category 
  */
  getTagsOfCategory(categoryId: number): Observable<Tag[]> {
    return this._http
      .get<Tag[]>(this.tagsOfCustomCategoryUrl(categoryId))
        .pipe(
          take(1),
          map((tags: any) => {
            return tags.data;
          })
        );
  }

  /**
   * Add tag 
   * @param tag Tag object to add
   */
  addTag(tag: Tag): Observable<any> {
    return this._http.post(`${this.customTagsUrl()}`, tag)
      .pipe(take(1));
  }

  /**
   * Edit tag on the server
   * @param tag Tag object to edit
   */
  editTag(tag: Tag): Observable<any> {
    return this._http.post(`${this.customTagUrlById(tag.id)}`, tag)
      .pipe(take(1));
  }

  /**
   * Delete tag from the server
   * @param tag Tag object to delete
   */
  deleteTag(tag: Tag): Observable<any> {
    return this._http.delete(`${this.customTagUrlById(tag.id)}`)
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
