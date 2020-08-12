import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-admin-navbar",
  templateUrl: "./admin-navbar.component.html",
  styleUrls: ["./admin-navbar.component.scss"],
})
export class AdminNavbarComponent implements OnInit {
  items: MenuItem[];

  constructor() {}

  ngOnInit(): void {
    
  }
}
