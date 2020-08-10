import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appVendorAdminColorChooser]'
})
export class VendorAdminColorChooserDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
