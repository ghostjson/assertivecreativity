import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem("Token");

    const auth_req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    return next.handle(auth_req);
  }
}
