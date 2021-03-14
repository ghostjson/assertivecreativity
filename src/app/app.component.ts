import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { UserDetailsService } from './store/user-details.service';
import { CommonService } from './common.service';
import { PrimeNGConfig } from 'primeng/api';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  loader: boolean;
  title: string = 'acreativity';
  destroy: Subject<void>;
  adminPage: boolean;

  constructor(
    private _user: UserDetailsService,
    private _common: CommonService,
    private _primengConfig: PrimeNGConfig,
    private _router: Router
  ) {
    this.destroy = new Subject<void>();
    this.loader = true;
  }

  ngOnInit() {
    this.adminPage =
      this._router.url.includes('admin') || this._router.url.includes('vendor');
    this._common.loader
      .pipe(takeUntil(this.destroy))
      .subscribe((status) => (this.loader = status));

    this._primengConfig.ripple = true;

    // trigger loader on route changes
    this._router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError
        ),
        takeUntil(this.destroy)
      )
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this._common.setLoader(true);
        } else {
          setTimeout(() => {
            this._common.setLoader(false);
          }, 500);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
