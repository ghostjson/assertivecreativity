import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-vendor-admin-header',
    templateUrl: './vendor-admin-header.component.html',
    styleUrls: ['./vendor-admin-header.component.scss']
})
export class VendorAdminHeaderComponent implements OnInit {
    sidebarLinks: Array<any>;

    constructor() { }

    ngOnInit(): void {
        this.sidebarLinks = [
            {
                text: 'Home',
                location: '/vendor/admin/',
                icon: 'fas fa-home'
            },
            {
                text: 'Mail',
                location: ['/vendor/admin/mail'],
                icon: 'fas fa-envelope-open-text'
            },
        ];
    }
}
