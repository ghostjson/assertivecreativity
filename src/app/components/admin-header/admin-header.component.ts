import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserDetailsService } from 'src/app/store/user-details.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  sidebar: boolean = false;
  sidebarItems: MenuItem[];
  navItems: MenuItem[];
  name: string;
  currentUrl: string;
  user: User;


  constructor(
    private _user: UserDetailsService,
    private _activatedRoute: ActivatedRoute,
    private _common: CommonService
  ) { }

  ngOnInit(): void {
    this.currentUrl = this._activatedRoute.snapshot.url.join('/');

    let token = localStorage.getItem('Token');
    if (token) {
      this._user.getUser().subscribe((user: User) => {
        this.user = user;
        this.name = `${user.first_name} ${user.last_name}`;
        console.info('User details: ', this.user);

        this.sidebarItems = [
          {
            label: 'Home',
            routerLink: `/${user.role}/`,
            icon: 'pi pi-home'
          },
          {
            label: 'Orders',
            routerLink: `/${user.role}/orders`,
            icon: 'pi pi-chart-line'
          },
          {
            label: 'Products',
            routerLink: `/${user.role}/products`,
            icon: 'pi pi-briefcase'
          },
          {
            label: 'Categories',
            routerLink: `/${user.role}/categories`,
            icon: 'pi pi-folder'
          },
          {
            label: 'Tags',
            routerLink: `/${user.role}/tags`,
            icon: 'pi pi-tags'
          },
          {
            label: 'Forms',
            routerLink: `/${user.role}/forms`,
            icon: 'pi pi-book'
          },
        ];
      })
    }
    else {
      this.user = null;
    }

    this.navItems = [
      {
        label: 'Go To Store',
        items: [
          {
            label: 'Stock Items',
            routerLink: '/shop/stock'
          },
          {
            label: 'Customize',
            routerLink: '/shop/custom'
          }
        ]
      }
    ];
  }
  
  ngAfterViewChecked(): void {
    this.positionSidebarCloseBtn();
  }
  
  /**
   * Position the sidebar close button
   */
  positionSidebarCloseBtn(): void {
    let sideBarEl: HTMLDivElement = document.querySelector('.p-sidebar');
    let sideBarDetailsEl: HTMLDivElement = document.querySelector('.sidebar-details');
    let sideBarItemsEl: HTMLDivElement = document.querySelector('.sidebar-items');
    let sideBarCloseBtn: HTMLButtonElement = document.querySelector('.p-sidebar-close')

    let sideBarDetailsElHeight: number = Number(window.getComputedStyle(sideBarDetailsEl).height.split('px')[0]);
    let sideBarElHeight: number = Number(window.getComputedStyle(sideBarEl).height.split('px')[0]);

    let sideBarItemsElHeight: number = sideBarElHeight - sideBarDetailsElHeight - 100;
    sideBarItemsEl.style.height = sideBarItemsElHeight + 'px';

    sideBarCloseBtn.style.top = sideBarDetailsElHeight + sideBarItemsElHeight + 40 + 'px';
  }

  /**
   * Toggle sidebar
   */
  toggleSidebar(): void {
    this.sidebar = !this.sidebar;
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
   * Return width of the window
   */
  windowWidth(): number {
    return window.innerWidth;
  }
}
