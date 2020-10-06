import { Component, OnInit } from "@angular/core";
import { Product } from "../../models/Product";
import { AdminProductService } from "../../services/admin-product.service";
import { MessageService, ConfirmationService } from "primeng/api";
import { IdGeneratorService } from 'src/app/services/id-generator.service';

@Component({
  selector: "app-admin-products-list",
  templateUrl: "./admin-products-list.component.html",
  styleUrls: ["./admin-products-list.component.scss"],
  providers: [MessageService, ConfirmationService],
})
export class AdminProductsListComponent implements OnInit {
  products: Product[];
  selectedProducts: Product[];

  constructor(
    private _productService: AdminProductService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService,
    public _idGen: IdGeneratorService
  ) {}

  ngOnInit() {
    this._productService.getProducts()
      .subscribe((products: Product[]) => {
        this.products = products;
      });
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
        // this._productService.deleteProductsBatch(deleteIndices);

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
          return val.id === product.id;
        });

        // delete the found index
        if (deleteIndex > -1) {
          this.products.splice(deleteIndex, 1);
          
          // delete from the server
          this._productService.deleteProduct(product.id)
            .subscribe();

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

  /**
   * Duplicate a product
   * @param product Product to duplicate
   */
  duplicateProduct(product: Product): void {
    let duplicate: Product = new Product(product);

    duplicate.id = undefined;

    // add the product to products 
    this._productService.addProduct(duplicate)
      .subscribe((duplicateProduct: Product) => {
        this.products.push(new Product(duplicateProduct));
        console.log('Duplicated Product returned: ', duplicateProduct.id, duplicateProduct);
      });
  }

  /**
   * Returns the availability badge string
   * @param product Product object
   */
  availability(product: Product): string {
    let status: string = 'instock';

    if (product.stock < 10) {
      status = 'lowstock';
    }

    if (product.stock <= 0) {
      status = 'outofstock';
    }

    return status;
  }
}
