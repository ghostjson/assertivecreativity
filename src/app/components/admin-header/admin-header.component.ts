import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserDetailsService } from 'src/app/store/user-details.service';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(
    public _user: UserDetailsService,
    public _auth: AuthService
  ) { }

  ngOnInit(): void {
    this.navItems = [
      {
        label: 'Go To Store',
        routerLink: '/',
        icon: 'pi pi-shopping-cart'
      }
    ];

    this.sidebarItems = [
      {
        label: 'Home',
        routerLink: '/admin/',
        icon: 'pi pi-home'
      },
      {
        label: 'Orders',
        routerLink: '/admin/orders',
        icon: 'pi pi-chart-line'
      },
      {
        label: 'Products',
        routerLink: '/admin/products',
        icon: 'pi pi-briefcase'
      },
      {
        label: 'Categories',
        routerLink: '/admin/categories',
        icon: 'pi pi-folder'
      },
      {
        label: 'Tags',
        routerLink: '/admin/tags',
        icon: 'pi pi-tags'
      }
    ];

    this._user.getUser().subscribe((user) => {
      this.name = `${user.firstName} ${user.lastName}`;
    });
  }

  /**
   * Toggle sidebar
   */
  toggleSidebar(): void {
    this.sidebar = !this.sidebar;
  }
}
