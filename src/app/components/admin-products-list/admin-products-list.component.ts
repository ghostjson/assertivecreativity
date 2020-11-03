import { Component, OnInit } from "@angular/core";
import { Product } from "../../models/Product";
import { AdminProductService } from "../../services/admin-product.service";
import { MessageService, ConfirmationService } from "primeng/api";
import { IdGeneratorService } from 'src/app/services/id-generator.service';
import { User } from 'src/app/models/User';
import { UserDetailsService } from 'src/app/store/user-details.service';

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
    public _idGen: IdGeneratorService,
    private _userDetailsService: UserDetailsService
  ) {}

  ngOnInit() {
    let user: User = this._userDetailsService.getUserLocal();
    this._productService.getProducts(user.role)
      .subscribe((products: Product[]) => {
        this.products = products;
        console.log('products received: ', products);
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
    /**
     * TODO: Fix duplicated product
     * - stock is being proxied now, so fix that
     */
    let duplicate: Product = {...product};

    duplicate.id = null;
    duplicate.category_id = product.category.id;
    duplicate.stock = 30;
    duplicate.serial = product.serial + '-copy';

    // add the product to products 
    this._productService.addProduct(duplicate)
      .subscribe((res: any) => {
        res.data.category = duplicate.category;
        this.products.unshift(res.data);
        this._messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Product Duplicated",
          life: 2000,
        });
        console.log('Product duplicated: ', res);
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
