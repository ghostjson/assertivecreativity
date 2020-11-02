import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { User } from 'src/app/models/User';
import { MenuItem } from 'primeng/api';
import { ProductService } from 'src/app/services/product.service';

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

  @Output() onSearchStart: EventEmitter<string> = new EventEmitter<string>();
  
  currentUrl: string;
  searchValue: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.currentUrl = this._activatedRoute.snapshot.url.join('/');
    console.info('Current URL: ', this.currentUrl);
  }

  /**
   * Check if the logged in user is admin
   */
  isAdmin() {
    if(this.user && this.user.role === 'admin') {
      return true;
    }

    return false;
  }

  /**
   * Emit the search string
   * @param event event object
   */
  emitValue(event: KeyboardEvent) {
    if(event.key.toLowerCase() === 'enter') {
      this.onSearchStart.emit(this.searchValue.trim());
    }
  }
}
