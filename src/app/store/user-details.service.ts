import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { take } from 'rxjs/operators';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  API_URL: string;

  constructor(
    private _auth: AuthService,
    private _http: HttpClient
  ) {
    this.API_URL = 'http://localhost:3000';
  }

  getUsersLink(): string {
    return `${this.API_URL}/users`;
  }

  getUsersLinkById(id: number): string {
    return `${this.getUsersLink()}/${id}`;
  }

  public getUser(): Observable<User> {
    // return this._auth.getUser();
    return this._http.get<User>(this.getUsersLinkById(0))
      .pipe(take(1));
  }

  editUser(user: User): Observable<User> {
    return this._http.put<User>(this.getUsersLinkById(user.id), user)
      .pipe(take(1));
  } 

  public async getRole() {
    let user = await this._auth.getUser();

    return new Promise((resolve, reject) => {
      resolve(user.data.role);
    })
  }
}
