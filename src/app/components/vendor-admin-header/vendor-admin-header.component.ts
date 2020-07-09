import { Component, OnInit } from "@angular/core";
import { UserDetailsService } from 'src/app/store/user-details.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-vendor-admin-header",
  templateUrl: "./vendor-admin-header.component.html",
  styleUrls: ["./vendor-admin-header.component.scss"],
})
export class VendorAdminHeaderComponent implements OnInit {
  sidebarLinks: Array<any>;
  name: any;

  constructor(public user: UserDetailsService, public auth: AuthService) {}

  ngOnInit(): void {
    this.sidebarLinks = [
      {
        text: "Home",
        location: "/admin/",
        icon: "fas fa-home",
      },
      {
        text: "Mail",
        location: ["/admin/mail"],
        icon: "fas fa-envelope-open-text",
      },
      {
        text: "Products",
        location: ["/admin/products"],
        icon: "fas fa-store",
      },
    ];

    this.user.getUser().then((res) => {
      this.name = res.data.name;
    });
  }

  getUsername() {
    
  }
}
