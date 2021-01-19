import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { UserDetailsService } from './store/user-details.service';
import { CommonService } from './common.service';
import { PrimeNGConfig } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterContentInit {
  loader: any;
  title: string = 'acreativity';
  destroy: Subject<void>;

  constructor(
    private _user: UserDetailsService, 
    private _common: CommonService,
    private _primengConfig: PrimeNGConfig
  ) {
    this.destroy = new Subject<void>();
  }


  ngOnInit() {
    this._common.loader
      .pipe(takeUntil(this.destroy))
      .subscribe(status => this.loader = status);
    this._primengConfig.ripple = true;
  }

  ngOnChanges(): void {
    // this._common.setLoader(true);
  }

  ngAfterContentInit() {
    setTimeout(() => {
      this._common.setLoader(false);
    }, 500);
  }

  ngOnDestroy(): void {
    this.destroy.complete();
  }
}
