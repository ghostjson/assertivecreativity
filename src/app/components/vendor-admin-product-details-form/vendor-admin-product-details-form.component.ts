import {
  Component,
  ComponentRef,
  ComponentFactory,
  ComponentFactoryResolver,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  Input
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
    // add the product in the server
    this._productService.addProduct(this.newProductForm.value);

    // redirect to the products page
    this.router.navigate(['/vendor/admin/products']);
  }

  insertFeatureForm(): void {

  }
}
