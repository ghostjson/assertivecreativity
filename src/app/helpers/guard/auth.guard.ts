import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { User } from 'src/app/models/User';
import { UserDetailsService } from 'src/app/store/user-details.service';
import { AuthService } from "../../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _userService: UserDetailsService,
    private _router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree >
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let status: boolean = false;
    let user: User = this._userService.getUserLocal();

    if(this._authService.isAuthenticated()) {
      console.info('user  from auth guard', user, next);
      if(next.data.role && (next.data.role != user.role)) {
        status = false;
        // redirect to signin page 
        this._router.navigate(['/']);
      }
      else {
        status = true;
      }
    }
    else {
      // redirect to signin page 
      this._router.navigate(['/signin'], {
        skipLocationChange: false,
        queryParams: {
          return: state.url
        }
      });
    }

    return status;
  }
}
