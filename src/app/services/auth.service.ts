import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take, tap } from 'rxjs/operators';
import { ParsedToken, Token } from '../models/Token';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  host_name: string;
  username: string;
  private chars: string =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

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
   * convert base64 string to readable string
   * Thank you https://stackoverflow.com/a/64536260/6882980
   * @param input input base64 string
   * @returns string converted from base64 to normal string
   */
  private atob(input: string): string {
    var str = String(input).replace(/=+$/, '');
    if (str.length % 4 == 1) {
      throw new Error(
        "'atob' failed: The string to be decoded is not correctly encoded."
      );
    }
    for (
      // initialize result and counters
      var bc = 0, bs, buffer, idx = 0, output = '';
      // get next character
      (buffer = str.charAt(idx++));
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer &&
      ((bs = bc % 4 ? bs * 64 + buffer : buffer),
      // and if not first of each 4 characters,
      // convert the first 8 bits to one ascii character
      bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      // try to find character in table (0-63, not found => -1)
      buffer = this.chars.indexOf(buffer);
    }
    return output;
  }

  /**
   * Parse a jwt access token payload to an object
   * Thank you https://stackoverflow.com/a/64536260/6882980
   * @param token token to parse as string
   * @returns parsed jwt token object
   */
  parseJwt(token: string): ParsedToken {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      this.atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  /**
   * Authenticate the user
   * @param email Email of the user
   * @param password Password of the user
   */
  authenticate(email: string, password: string): Observable<Token> {
    let credentials = {
      email: email,
      password: password,
    };

    return this._http.post<Token>(this.host('login'), credentials).pipe(
      take(1),
      tap((token: Token) => {
        const parsedJwt: ParsedToken = this.parseJwt(token.access_token);
        localStorage.setItem('Token', token.access_token);
        localStorage.setItem('jwt_exp', String(parsedJwt.exp));
        localStorage.setItem('user', JSON.stringify(token.user));
      })
    );
  }

  /**
   * Logout the current user
   */
  logout(): void {
    /**
     * TODO: Ask akhil about logout route
     */
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
    localStorage.removeItem('jwt_exp');
  }

  /**
   * Register new user
   * @param form form data
   */
  register(form: User): Observable<Token> {
    return this._http.post<Token>(this.host('register/user'), form).pipe(
      take(1),
      tap((token: Token) => {
        const parsedJwt: ParsedToken = this.parseJwt(token.access_token);
        localStorage.setItem('Token', token.access_token);
        localStorage.setItem('jwt_exp', String(parsedJwt.exp));
        localStorage.setItem('user', JSON.stringify(token.user));
      })
    );
  }

  /**
   * Return if the current user is authenticated
   */
  isAuthenticated(): boolean {
    let Token: string = localStorage.getItem('Token');
    const tokenExists = Token != null ? true : false;

    if (tokenExists) {
      const expTime: number = Number(localStorage.getItem('jwt_exp'));
      return !(new Date().valueOf() > expTime * 1000);
    }

    return false;
  }

  /**
   * Return user details if authenticated
   */
  getUser(): Observable<User> {
    if (this.isAuthenticated()) {
      return this._http.get<User>(this.host('user')).pipe(take(1));
    }
  }
}
