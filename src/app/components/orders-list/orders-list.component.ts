import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Table } from "primeng/table";
import {
  CustomFormInput,
  CustomFormsEntry,
  CustomOption,
  Order,
} from "src/app/models/Order";
import { ExcelService } from "src/app/services/excel.service";

@Component({
  selector: "app-orders-list",
  templateUrl: "./orders-list.component.html",
  styleUrls: ["./orders-list.component.scss"],
})
export class OrdersListComponent implements OnInit {
  @Input() orders: Order[];
  @Input() admin: boolean;
  @Input() userRole: string;

  selectedOrders: Object[];
  statuses: Object[];
  first: number;
  last: number;
  totalRecords: number;
  loading: boolean = true;

  @ViewChild("dt") table: Table;

  constructor(private _excelService: ExcelService) {}

  ngOnInit(): void {
    this.loading = false;
    this.selectedOrders = [];

    this.statuses = [
      { label: "Declined", value: "declined" },
      { label: "Accepted", value: "accepted" },
      { label: "New", value: "new" },
      { label: "Pending", value: "pending" },
      { label: "Renewal", value: "renewal" },
      { label: "Proposal", value: "proposal" },
    ];

    this.first = this.last = this.totalRecords = 0;

    if (this.admin) {
      console.log("admin mode detected");
    }
  }

  onActivityChange(event: any) {
    const value = event.target.value;
    if (value && value.trim().length) {
      const activity = parseInt(value);

      if (!isNaN(activity)) {
        this.table.filter(activity, "activity", "gte");
      }
    }
  }

  onDateSelect(value: any, dateType: string) {
    this.table.filter(this.formatDate(value), dateType, "equals");
  }

  formatDate(date: any) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = "0" + month;
    }

    if (day < 10) {
      day = "0" + day;
    }

    return date.getFullYear() + "-" + month + "-" + day;
  }

  onRepresentativeChange(event: any) {
    this.table.filter(event.value, "representative", "in");
  }


  exportOrdersExcel(): void {
    let excelSheetData: any[][] = this._excelService.constructOrdersExcelData(this.orders);

    excelSheetData.unshift([
      "ID",
      "PRODUCT NAME",
      "ORDER DATE",
      "DELIVERY DATE",
      "TOTAL PRICE",
    ]);

    this._excelService.exportExcel(excelSheetData);
  }
}
