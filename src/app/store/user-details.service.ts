import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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
    this.API_URL = environment.apiUrl;
  }

  private getUserLink(): string {
    return `${this.API_URL}/auth/user`;
  }

  getUser(): Observable<User> {
    return this._http.get<User>(this.getUserLink())
      .pipe(
        take(1),
        map((user: any) => {
          return user.data;
        })
      );
  }

  getUserLocal(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  editUser(user: User): Observable<User> {
    return this._http.post<User>(this.getUserLink(), user)
      .pipe(take(1));
  } 

  getRole() {
    this._auth.getUser()
      .pipe(take(1))
      .subscribe((user: User) => {
        console.log('User role rceived: ', user.role_id);
        return user.role_id;
      });
  }
}
