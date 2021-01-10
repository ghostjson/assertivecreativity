import { Component } from '@angular/core';
import { UserDetailsService } from './store/user-details.service';
import { CommonService } from './common.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loader: any;
  title: string = 'acreativity';

  constructor(
    private _user: UserDetailsService, 
    private _common: CommonService,
    private _primengConfig: PrimeNGConfig
  ) {

  }


  ngOnInit() {
    this._common.loader.subscribe(status => this.loader = status);
    this._primengConfig.ripple = true;
  }

  ngAfterContentInit() {
    this._common.setLoader(false);
  }



}
