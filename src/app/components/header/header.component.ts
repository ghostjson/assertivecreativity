import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { UserDetailsService } from "src/app/store/user-details.service";
import { CommonService } from "src/app/common.service";
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/models/User';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from "@angular/router";
import { ProductCategorisationService } from 'src/app/services/product-categorisation.service';
import { Category } from 'src/app/models/Category';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})

export class HeaderComponent implements OnInit {
  @Input() searchString: string = '';
  @Output() searchBtnClick: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('categoryDropdown') categoryDropdown: any;

  user_role: any;
  cartLength: number;
  navStartItems: MenuItem[];
  navEndItems: MenuItem[];
  logo: string;
  user: User;
  currentUrl: string;
  accountItems: MenuItem[];
  customCategoriesDropdownList: MenuItem[];
  stockCategoriesDropdownList: MenuItem[];

  constructor(
    private _user: UserDetailsService,
    public _auth: AuthService,
    private _common: CommonService,
    private _cartService: CartService,
    private _activatedRoute: ActivatedRoute,
    private _prodCategorisationService: ProductCategorisationService
  ) {}

  ngOnInit() {
    this.currentUrl = this._activatedRoute.snapshot.url.join('/');
    this.logo = './../../../assets/images/logo.png';
    this.cartLength = 0;

    let token = localStorage.getItem('Token');
    if (token) {
      this._common.setLoaderFor(
        this._user.getUser().subscribe((user: User) => {
          this.user = user;
          console.info('User details: ', this.user);
        })
      );
    }
    else {
      this.user = null;
      console.info('User details: ', this.user);
    }

    this.navStartItems = [
      {
        label: 'About Us',
        routerLink: '/about'
      },
      {
        label: 'Contact Us',
        routerLink: '/contact'
      }
    ];

    this.accountItems = [
      {
        label: 'Sign In',
        routerLink: '/signin',
        queryParams: {return: this.currentUrl},
        visible: !this.user
      },
      {
        label: 'Sign Up',
        routerLink: '/signup',
        queryParams: {return: this.currentUrl},
        visible: !this.user
      },
      {
        label: 'Vendor Dashboard',
        routerLink: `/vendor/`,
        visible: Boolean(this.user && this.user.role === 'vendor')
      },
      {
        label: 'Admin Dashboard',
        routerLink: `/admin/`,
        visible: Boolean(this.user && this.user.role === 'admin')
      },
      {
        label: `Profile`,
        routerLink: '/profile',
        visible: this.user != null
      },
      {
        label: `Orders`,
        routerLink: '/orders',
        visible: this.user != null
      },
      {
        label: 'Log Out',
        routerLink: '/logout',
        queryParams: {return: this.currentUrl},
        visible: this.user != null
      }
    ];

    this._prodCategorisationService.getCustomCategories()
      .subscribe(categories => {
        this.customCategoriesDropdownList = categories.map(category => {
          return {
            label: category.name,
            routerLink: '/shop/custom',
            queryParams: {
              category: category.id
            }
          }
        });
        console.log(categories);
      });

    this._prodCategorisationService.getStockCategories()
      .subscribe(categories => {
        this.stockCategoriesDropdownList = categories.map(category => {
          return {
            label: category.name,
            routerLink: '/shop/stock',
            queryParams: {
              category: category.id
            }
          }
        });
        console.log(categories);
      });
  }

  ngOnChanges(): void {
    this.accountItems = [
      {
        label: 'Sign In',
        routerLink: '/signin',
        queryParams: {return: this.currentUrl},
        visible: !this.user
      },
      {
        label: 'Sign Up',
        routerLink: '/signup',
        queryParams: {return: this.currentUrl},
        visible: !this.user
      },
      {
        label: 'Vendor Dashboard',
        routerLink: `/vendor/`,
        visible: this.user && this.user.role === 'vendor'
      },
      {
        label: 'Admin Dashboard',
        routerLink: `/admin/`,
        visible: this.user && this.user.role === 'admin'
      },
      {
        label: `Profile`,
        routerLink: '/profile',
        visible: this.user != null
      },
      {
        label: `Orders`,
        routerLink: '/orders',
        visible: this.user != null
      },
      {
        label: 'Log Out',
        routerLink: '/logout',
        queryParams: {return: this.currentUrl}
      }
    ];
  }

  /**
   * Emit the search string typed into the search bar
   * @param event search string typed
   */
  emitSearchString(): void {
    this.searchBtnClick.emit(this.searchString);
  }

  /**
   * Check if the logged in user has a dashboard
   */
  hasDashboard() {
    if(this.user && (this.user.role === 'admin' || this.user.role === 'vendor')) {
      return true;
    }

    return false;
  }

  toggleCategoryDropdown(event): void {
    this.categoryDropdown.show(event)
  }
}
