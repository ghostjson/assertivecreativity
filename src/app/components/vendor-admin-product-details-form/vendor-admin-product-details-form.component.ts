import {
  Component,
  ComponentRef,
  ComponentFactory,
  ComponentFactoryResolver,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Product, ProductColor, ProductSize } from '../../models/Product';
import { VendorAdminProductService } from '../../services/vendor-admin-product.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { VendorAdminProductColorChooserComponent } from '../../components/vendor-admin-product-color-chooser/vendor-admin-product-color-chooser.component';
import { VendorAdminColorChooserDirective } from '../../directives/vendor-admin-color-chooser.directive';


@Component({
  selector: 'app-vendor-admin-product-details-form',
  templateUrl: './vendor-admin-product-details-form.component.html',
  styleUrls: ['./vendor-admin-product-details-form.component.scss']
})
export class VendorAdminProductDetailsFormComponent implements OnInit, OnDestroy {
  @ViewChild(VendorAdminColorChooserDirective) colorChooserHost: VendorAdminColorChooserDirective;

  newProductForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    stock: new FormControl(),
    image: new FormControl(),
    addFeatureSelect: new FormControl(),
    features: new FormControl()
  });

  newProduct: Product;
  featuresComponentRefs: (ComponentRef<VendorAdminProductColorChooserComponent>)[] = [];

  constructor(
    private _productService: VendorAdminProductService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }


  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.featuresComponentRefs.forEach((feature: ComponentRef<VendorAdminProductColorChooserComponent>): void => {
      feature.destroy();
    });
  }

  addFeatureForm(): void {
    let featureType = this.newProductForm.value.addFeatureSelect;

    let componentFactory: ComponentFactory<VendorAdminProductColorChooserComponent>;

    let viewContainerRef: ViewContainerRef;

    if (featureType === 'color') {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(VendorAdminProductColorChooserComponent);
      viewContainerRef = this.colorChooserHost.viewContainerRef;

      console.log('Color feature added to product', this.featuresComponentRefs);
    }
    else {
      console.log('No matching feature found');
      componentFactory = null;
    }

    if (componentFactory != null) {
      this.featuresComponentRefs.push(viewContainerRef.createComponent(componentFactory));
    }
  }

  // add new product to the database
  addProduct() {
    console.log(this.newProductForm);
    this.newProduct.id = String(Math.floor(Math.random() * 1000));
    this.newProduct.name = this.newProductForm.value.name;
    this.newProduct.description = this.newProductForm.value.description;
    this.newProduct.price = this.newProductForm.value.price;
    this.newProduct.stock = this.newProductForm.value.stock;
    this.newProduct.sales = 0;
    this.newProduct.image = this.newProductForm.value.image;
    this.newProduct.features = [];

    // add the product in the server
    this._productService.addProduct(this.newProduct);

    // redirect to the products page
    this.router.navigate(['/vendor/admin/products']);

    return this.newProduct;
  }

  insertFeatureForm(): void {

  }
}
