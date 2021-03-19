import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  productId: number;
  productForm: FormGroup;
  activeAttr: ProductAttribute;
  activeChildAttr: ProductAttribute;
  productViews: MenuItem[];
  editMode: boolean;

  componentDestroy = new Subject<void>();

  constructor(
    private _productService: AdminProductService,
    private _commonService: CommonService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _fileManagerService: AdminFileManagerService
  ) {}

  ngOnInit(): void {
    /**
     * TODO: change once the api is fixed
     */
    this.product = history.state.product && history.state.product.custom_forms;
    this.productId = Number(this._activatedRoute.snapshot.paramMap.get('id'));
    this.editMode = Boolean(
      this._router.url.includes('edit') && this.productId
    );

    if (this.editMode) {
      if (this.product) {
        this.productForm = this._productService.createCustomProductForm(
          this.product
        );
      } else {
        this._commonService.setLoaderFor(
          this._productService
            .getCustomProduct(this.productId)
            .subscribe((res) => {
              /**
               * TODO: edit this once the api is implemented
               */
              res.custom_forms.product.id = res.id;
              this.product = res.custom_forms;
              this.productForm = this._productService.createCustomProductForm(
                this.product
              );
            })
        );
      }
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
    if (this.editMode) {
      this._commonService.setLoaderFor(
        this._productService.editCustomProduct(transformedProd).subscribe(
          (res) => {
            this._router.navigate(['/admin/products']);
          },
          (err) => {
            console.error(err);
          }
        )
      );
    } else {
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
      const frontView = <string>productObj.product.images[i].front_view.src;
      if (frontView && !frontView.startsWith('http')) {
        productObj.product.images[
          i
        ].front_view.src = await this._fileManagerService
          .uploadFile(<string>productObj.product.images[i].front_view.src)
          .toPromise();
      }

      const backView = <string>productObj.product.images[i].back_view.src;
      if (backView && !backView.startsWith('http')) {
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
    const thumbnail = <string>attr.thumbnail.src;
    if (thumbnail && !thumbnail.startsWith('http')) {
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
        const frontView = <string>attr.images[i].front_view.src;
        if (frontView && !frontView.startsWith('http')) {
          attr.images[
            i
          ].front_view.src = await this._fileManagerService
            .uploadFile(<string>attr.images[i].front_view.src)
            .toPromise();
        }

        const backView = <string>attr.images[i].back_view.src;
        if (backView && !backView.startsWith('http')) {
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
