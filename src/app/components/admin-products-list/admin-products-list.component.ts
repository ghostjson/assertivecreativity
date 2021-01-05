import { Component, OnInit } from "@angular/core";
import { Product, StockProduct } from "../../models/Product";
import { AdminProductService } from "../../services/admin-product.service";
import { MessageService, ConfirmationService } from "primeng/api";
import { IdGeneratorService } from 'src/app/services/id-generator.service';
import { User } from 'src/app/models/User';
import { UserDetailsService } from 'src/app/store/user-details.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-admin-products-list",
  templateUrl: "./admin-products-list.component.html",
  styleUrls: ["./admin-products-list.component.scss"],
  providers: [MessageService, ConfirmationService],
})
export class AdminProductsListComponent implements OnInit {
  stockProducts: StockProduct[];
  customProducts: Product[];
  selectedProducts: StockProduct[];
  selectedCustomProducts: Product[];
  showUploadingProgess: boolean;
  user: User;
  activeProductsTabIndex: number;
  public API_URL = environment.apiUrl;

  constructor(
    private _productService: AdminProductService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService,
    public _idGen: IdGeneratorService,
    private _userDetailsService: UserDetailsService
  ) {}

  ngOnInit() {
    this.showUploadingProgess = false;
    this.user = this._userDetailsService.getUserLocal();
    this._productService.getStockProducts(this.user.role)
      .subscribe((stockProducts: StockProduct[]) => {
        this.stockProducts = stockProducts;
        console.log('stock products received: ', stockProducts);
      });
    
    this._productService.getCustomProducts(this.user.role)
    .subscribe((customProducts: Product[]) => {
      this.customProducts = customProducts;
      console.log('custom products received: ', customProducts);
    });

    this.activeProductsTabIndex = 0;
  }

  /**
   * Delete a single product
   * @param product Product to delete
   */
  deleteCustomProduct(product: Product) {
    this._confirmationService.confirm({
      message: "Are you sure you want to delete " + product.name + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        // find index of the product to delete
        let deleteIndex: number = this.customProducts.findIndex((val) => {
          return val.id === product.id;
        });

        // delete the found index
        if (deleteIndex > -1) {
          this.stockProducts.splice(deleteIndex, 1);
          
          // delete from the server
          this._productService.deleteCustomProduct(product.id)
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
    let duplicate: Product = {...product};

    duplicate.id = null;
    duplicate.category_id = product.category.id;
    duplicate.serial = product.serial + '-copy';

    // add the product to products 
    this._productService.addCustomProduct(duplicate)
      .subscribe((res: any) => {
        res.data.category = duplicate.category;
        this.customProducts.unshift(res.data);
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

  /**
   * Upload the excel file containing product list
   * @param event event object containing files to upload
   */
  excelUploadHandler(event: any) {
    this.showUploadingProgess = true;
    console.info('files to upload', event.files);
    this._productService.uploadProductsExcel(event.files[0])
      .subscribe((res: any) => {
        this.showUploadingProgess = false;
        event = null;
        console.log(res);

        this._productService.getStockProducts(this.user.role)
          .subscribe((stockProducts: StockProduct[]) => {
            this.stockProducts = stockProducts;
            console.log('products received: ', stockProducts);
          });
      });
  }
}
