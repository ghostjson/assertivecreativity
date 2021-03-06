import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        console.error(err);
        let returnUrl: string = this._router.url;
        console.info('return url from error inter: ', this._router.url);

        if ([401, 403].indexOf(err.status) !== -1) {
          console.error('Authorization/Authentication error caught');
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          this._authService.logout();
          this._router.navigate(['/signin'], {
            skipLocationChange: false,
            queryParams: {
              return: returnUrl,
            },
          });
        }

        return throwError(err);
      })
    );
  }
}
