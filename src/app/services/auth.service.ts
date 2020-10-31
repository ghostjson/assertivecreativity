import { Injectable } from '@angular/core';
import { SignupForm } from '../models/SignupForm';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take, tap } from 'rxjs/operators';
import { Token } from '../models/Token';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  host_name: string;
  username: string;

  constructor(private _http: HttpClient) {
    this.host_name = environment.apiUrl + '/auth/';
  }

  /**
   * Return link to the API endpoint
   * @param endpoint api endpoint to access
   */
  private host(endpoint: string): string {
    return this.host_name + endpoint;
  }

  /**
   * Authenticate the user
   * @param email Email of the user
   * @param password Password of the user
   */
  authenticate(email: string, password: string): Observable<Token> {
    let credentials = {
      email: email,
      password: password
    };
    
    return this._http.post<Token>(this.host('login'), credentials)
      .pipe(
        take(1),
        tap((token: Token) => {
          /**
           * TODO: Remove once role is added from server
           */
          if(token.user.role_id === '1') {
            token.user.role = 'admin';
          }

          localStorage.setItem('Token', token.access_token);
          localStorage.setItem('user', JSON.stringify(token.user));
          console.log('token received: ', localStorage.getItem('Token'));
          console.info('User Data: ', localStorage.getItem('user'));
        })
      );
  }

  /**
   * Logout the current user
   */
  logout(): void {
    // return this._http.post(this.host('logout'), {})
    //   .pipe(
    //     tap(() => {
    //       localStorage.removeItem('Token');
    //       localStorage.removeItem('user');
    //     }),
    //     take(1)
    //   );
    localStorage.removeItem('Token');
    localStorage.removeItem('user');
  }

  /**
   * Register new user
   * @param form form data 
   */
  register(form: SignupForm): Observable<Token> {
    return this._http.post<Token>(this.host('register/user'), form)
      .pipe(
        take(1),
        tap((token: Token) => {
          /**
           * TODO: Remove once role is added from server
           */
          if(token.user.role_id === '1') {
            token.user.role = 'admin';
          }

          localStorage.setItem('Token', token.access_token);
          localStorage.setItem('user', JSON.stringify(token.user));
          console.log('token received: ', localStorage.getItem('Token'));
        })
      );
  }

  /**
   * Return if the current user is authenticated 
   */
  isAuthenticated(): boolean {
    let Token: string = localStorage.getItem('Token');
    return Token != null ? true : false;
  }

  /**
   * Return user details if authenticated
   */
  getUser(): Observable<User> {
    if (this.isAuthenticated()) {
      return this._http.get<User>(this.host('user'))
        .pipe(take(1));
    }
  }
}
