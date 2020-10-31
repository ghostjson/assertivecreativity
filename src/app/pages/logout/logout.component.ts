import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    let returnUrl: string = this._router.parseUrl(this._router.url).queryParamMap.get('return');

    if(!returnUrl) {
      returnUrl = '/';
    }
    
    this._authService.logout();
    this._router.navigate([returnUrl]);
  }
}
