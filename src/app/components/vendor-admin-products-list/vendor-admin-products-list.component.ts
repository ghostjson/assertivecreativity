import { Component, OnInit } from "@angular/core";
import { Product } from "../../models/Product";
import { VendorAdminProductService } from "../../services/vendor-admin-product.service";
import { MessageService, ConfirmationService } from "primeng/api";

@Component({
  selector: "app-vendor-admin-products-list",
  templateUrl: "./vendor-admin-products-list.component.html",
  styleUrls: ["./vendor-admin-products-list.component.scss"],
  providers: [MessageService, ConfirmationService],
})
export class VendorAdminProductsListComponent implements OnInit {
  products: Product[];
  selectedProducts: Product[];

  constructor(
    private _productService: VendorAdminProductService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.products = this._productService.getProducts();
  }

  /**
   * Delete seletected products from the table
   */
  deleteSelectedProducts() {
    this._confirmationService.confirm({
      message: "Are you sure you want to delete the selected products?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        let deleteIndices: number[] = [];
        console.log('selected products list: ', this.selectedProducts);
        
        // delete from local storage
        this.products = this.products.filter((val) => {
          if (!this.selectedProducts.includes(val)) {
            return true;
          }
          else {
            deleteIndices.push(val.id);
            return false;
          }
        });

        // delete from server
        this._productService.deleteProductsBatch(deleteIndices);

        this.selectedProducts = null;
        this._messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Products Deleted",
          life: 3000,
        });
      },
    });
  }

  /**
   * Delete a single product
   * @param product Product to delete
   */
  deleteProduct(product: Product) {
    this._confirmationService.confirm({
      message: "Are you sure you want to delete " + product.name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        // find index of the product to delete
        let deleteIndex: number = this.products.findIndex((val) => {
          console.log(val.id, "prid: ", product.id);
          return val.id === product.id;
        });

        // delete the found index
        if (deleteIndex > -1) {
          this.products.splice(deleteIndex, 1);
          this._productService.deleteProduct(deleteIndex);

          this._messageService.add({
            severity: "success",
            summary: "Successful",
            detail: "Product Deleted",
            life: 3000,
          });
        } else {
          this._messageService.add({
            severity: "error",
            summary: "Unsuccessful",
            detail: "Product Not Found",
            life: 3000,
          });
        }
      },
    });
  }

  // findIndexById(id: number): number {
  //   let index = -1;
  //   for (let i = 0; i < this.products.length; i++) {
  //     if (this.products[i].id === id) {
  //       index = i;
  //       break;
  //     }
  //   }

  //   return index;
  // }
}
