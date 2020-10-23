import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
    let returnUrl = '/' + (null ? '': this._router.parseUrl(this._router.url).queryParamMap.get('return'));
    localStorage.removeItem('Token');
    this._router.navigate([returnUrl]);
  }
}
