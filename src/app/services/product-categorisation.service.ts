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
    return `${this.categoriesUrl()}/${id}`;
  }

  /**
   * 
   * @param id id of the 
   */
  tagsOfCategoryUrl(id: number): string {
    return `${this.categoriesUrl()}/tags/${id}`
  }

  /**
   * Return the tags url
   */
  tagsUrl(): string {
    return `${environment.apiUrl}/products/tags`;
  }

  tagUrl(): string {
    return `${environment.apiUrl}/products/tag`;
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
    return this._http.get<Category[]>(`${this.categoriesUrl()}`)
      .pipe(
        take(1),
        map((res: any) => {
          return res.data as Category[];
        })
      );
  }

  /**
   * Add a category to the list
   * @param category Category Object
   */
  addCategory(category: Category): Observable<Category> {
    return this._http.post<Category>(`${this.categoriesUrl()}`, category)
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
   * Get tags  
   */
  getTags(): Observable<Tag[]> {
    return this._http.get<Tag[]>(`${this.tagsUrl()}`)
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
      .get<Tag[]>(this.tagsOfCategoryUrl(categoryId))
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
    return this._http.post(`${this.tagUrl()}`, tag)
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
    return this._http.delete(`${this.tagsUrl()}/${tag.id}`)
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
