import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-admin',
  templateUrl: './vendor-admin.component.html',
  styleUrls: [
               './vendor-admin.component.scss',
               './adminlte.min.scss',
               './OverlayScrollbars.min.scss'
             ]
})
export class VendorAdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
