import { Injectable } from "@angular/core";
import * as XLSX from "xlsx";
import { CustomFormInput, CustomFormsEntry, CustomOption, Order } from '../models/Order';

@Injectable({
  providedIn: "root",
})
export class ExcelService {
  constructor() {}

  /**
   * Create the excel rows from the orders list
   * @param orders orders list
   */
  constructOrdersExcelData(orders: Order[]): any[][] {
    let orderExcelData: any[][] = [];

    orders.forEach((order: Order) => {
      let excelRow: any[] = [];

      excelRow.push(order.id);

      excelRow.push(order.data.product_details.name);

      let orderDate: Date = new Date(order.created_at);
      excelRow.push(orderDate.toLocaleDateString("en-US"));

      /**
       * TODO: Fix delivery dates incorectly exported
       */
      let deliveryDate: Date = null;
      excelRow.push(deliveryDate.toLocaleDateString("en-US"));

      excelRow.push(order.data.total_price);

      orderExcelData.push(excelRow);

      orderExcelData.push(["CUSTOM FORMS INPUT"]);

      order.data.custom_forms_entry.forEach((entry: CustomFormsEntry) => {
        if (entry.is_formgroup) {
          entry.subforms.forEach((subform: CustomFormInput) => {
            subform.options.forEach((option: CustomOption) => {
              if (option.input) {
                orderExcelData.push([option.title, option.input]);
              }

              if (!option.meta.isChained) {
                option.chained_options.forEach(
                  (chainedOption: CustomOption) => {
                    if (chainedOption.input) {
                      orderExcelData.push([
                        chainedOption.title,
                        chainedOption.input,
                      ]);
                    }
                  }
                );
              }
            });
          });
        }
        else {
          entry.options.forEach((option: CustomOption) => {
            if (option.input) {
              orderExcelData.push([option.title, option.input]);
            }

            if (!option.meta.isChained) {
              option.chained_options.forEach(
                (chainedOption: CustomOption) => {
                  if (chainedOption.input) {
                    orderExcelData.push([
                      chainedOption.title,
                      chainedOption.input,
                    ]);
                  }
                }
              );
            }
          });
        }
      });

      orderExcelData.push(['', '', '', '', '']);
    });

    return orderExcelData;
  }

  /**
   * Export excel data to file
   * @param excelData Data for the excel sheet
   */
  exportExcel(excelData: any[][]): void {
    console.info('excel sheet data: ', excelData);

    // create a workbook 
    let workBook: XLSX.WorkBook = XLSX.utils.book_new();
    let today: Date = new Date();
    // set the workbook properties 
    workBook.Props = {
      Title: `Order till ${today.toLocaleDateString('en-US')}`,
      Subject: 'Orders List',
      Author: 'Assertive Creativity Admin',
      CreatedDate: new Date(),
    };

    // create a worksheet 
    let workSheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(excelData);
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Orders');

    // save to file 
    XLSX.writeFile(workBook, 'test.xlsx');
  }
}
