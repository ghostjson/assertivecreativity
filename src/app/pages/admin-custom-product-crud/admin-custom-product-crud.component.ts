import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from 'src/app/common.service';
import { CustomProduct, ProductAttribute } from 'src/app/models/Product';
import { AdminFileManagerService } from 'src/app/services/admin-file-manager/admin-file-manager.service';
import { AdminProductService } from 'src/app/services/admin-product.service';

@Component({
  selector: 'app-admin-custom-product-crud',
  templateUrl: './admin-custom-product-crud.component.html',
  styleUrls: ['./admin-custom-product-crud.component.scss'],
})
export class AdminCustomProductCrudComponent implements OnInit, OnDestroy {
  @Input() product: CustomProduct;

  productForm: FormGroup;
  activeAttr: ProductAttribute;
  activeChildAttr: ProductAttribute;
  productViews: MenuItem[];

  componentDestroy = new Subject<void>();

  constructor(
    private _productService: AdminProductService,
    private _commonService: CommonService,
    private _router: Router,
    private _fileManagerService: AdminFileManagerService
  ) {}

  ngOnInit(): void {
    if (this.product) {
      this.productForm = this._productService.createCustomProductForm(
        this.product
      );
    } else {
      this.productForm = this._productService.createCustomProductForm();
    }

    this._productService
      .getState()
      .pipe(takeUntil(this.componentDestroy))
      .subscribe((state) => {
        this.activeChildAttr = state.activeChildAttr;
        this.activeAttr = state.activeAttr;
      });

    this.productViews = [
      {
        label: 'Front View',
      },
      {
        label: 'Back View',
      },
    ];
  }

  ngOnDestroy(): void {
    this.componentDestroy.next();
    this.componentDestroy.complete();
  }

  /**
   * save the product
   */
  async saveProduct(): Promise<void> {
    let transformedProd = await this.transformProductImgs();
    this._commonService.setLoaderFor(
      this._productService.addCustomProduct(transformedProd).subscribe(
        (res) => {
          this._router.navigate(['/admin/products']);
        },
        (err) => {
          console.error(err);
        }
      )
    );
  }

  /**
   * upload the images to server and replace the base64 strings
   * in the products with url
   */
  async transformProductImgs(): Promise<CustomProduct> {
    this._commonService.setLoader(true);
    let productObj: CustomProduct = this.productForm.value;

    // upload the base images
    for (let i = 0; i < productObj.product.images.length; i += 1) {
      if (productObj.product.images[i].front_view.src) {
        productObj.product.images[
          i
        ].front_view.src = await this._fileManagerService
          .uploadFile(<string>productObj.product.images[i].front_view.src)
          .toPromise();
      }

      if (productObj.product.images[i].back_view.src) {
        productObj.product.images[
          i
        ].back_view.src = await this._fileManagerService
          .uploadFile(<string>productObj.product.images[i].back_view.src)
          .toPromise();
      }
    }

    // upload images of the attributes
    for (let i = 0; i < productObj.attributes.length; i += 1) {
      productObj.attributes[i] = await this.transformAttributeImgs(
        productObj.attributes[i]
      );
    }

    this._commonService.setLoader(false);

    return productObj;
  }

  /**
   * upload the images to server and replace the base64 strings with url
   * @param attr attr to replace images with url
   */
  async transformAttributeImgs(
    attr: ProductAttribute
  ): Promise<ProductAttribute> {
    // upload thumbnail image
    if (attr.thumbnail.src) {
      attr.thumbnail.src = await this._fileManagerService
        .uploadFile(<string>attr.thumbnail.src)
        .toPromise();
    }

    if (attr.is_attribute_group) {
      // call uploading attribute images on children attributes
      for (let i = 0; i < attr.child_attributes.length; i += 1) {
        attr.child_attributes[i] = await this.transformAttributeImgs(
          attr.child_attributes[i]
        );
      }
    } else {
      // upload the images of the attribute
      for (let i = 0; i < attr.images.length; i += 1) {
        if (attr.images[i].front_view.src) {
          attr.images[
            i
          ].front_view.src = await this._fileManagerService
            .uploadFile(<string>attr.images[i].front_view.src)
            .toPromise();
        }
        if (attr.images[i].back_view.src) {
          attr.images[
            i
          ].back_view.src = await this._fileManagerService
            .uploadFile(<string>attr.images[i].back_view.src)
            .toPromise();
        }
      }
    }

    return attr;
  }
}
