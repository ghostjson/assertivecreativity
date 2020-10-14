import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CommonService } from 'src/app/common.service';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() navStartItems: MenuItem[];
  @Input() navCenterItems: MenuItem[];
  @Input() navEndItems: MenuItem[];
  @Input() logo: string;
  @Input() user: User;
  
  token: string;
  currentUrl: string;

  constructor(
    private _common: CommonService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUrl = this._activatedRoute.snapshot.url.join('/');
    console.info('Current URL: ', this.currentUrl);
  }
}
