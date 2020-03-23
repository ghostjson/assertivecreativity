import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { MainBannerComponent } from '../components/main-banner/main-banner.component';
import { ProductSliderComponent } from '../components/product-slider/product-slider.component';
import { FeaturedProductComponent } from '../components/featured-product/featured-product.component';
import { SpacerComponent } from '../components/spacer/spacer.component';
import { GraphicContentComponent } from '../components/graphic-content/graphic-content.component';
import { HeadingComponent } from '../components/heading/heading.component';
import { ContactFormComponent } from '../components/contact-form/contact-form.component';
import { ContactSectionComponent } from '../components/contact-section/contact-section.component';

@Injectable({
  providedIn: 'root'
})
export class WidgetManagerService {

  factory: any;
  componentRef: any;


  widgets: {name: string, component: any}[] = [
    {
      name: 'MainBanner',
      component: MainBannerComponent
    },
    {
      name: 'ProductSlider',
      component: ProductSliderComponent
    },
    {
      name: 'FeaturedProduct',
      component: FeaturedProductComponent
    },
    {
      name: 'Spacer',
      component: SpacerComponent
    },
    {
      name: 'GraphicContent',
      component: GraphicContentComponent
    },
    {
      name: 'Heading',
      component: HeadingComponent
    },
    {
      name: 'ContactForm',
      component: ContactFormComponent
    },
    {
      name: 'ContactSection',
      component: ContactSectionComponent
    }
  ]

  constructor(private resolver: ComponentFactoryResolver) { }


  widgetResolver(widgetName: string , entry: ViewContainerRef, data: object[]): void{
    for (const widget of this.widgets) {
        if(widgetName == widget.name){
          this.factory = this.resolver.resolveComponentFactory(widget.component);
          this.componentRef = entry.createComponent(this.factory);
          this.componentRef.instance.data = data;
        }
    }
  }

  

  drawWidgets(entry: ViewContainerRef, dataObjects: any): void{
    for (const widgetData of dataObjects.widgets) {
      this.widgetResolver(widgetData.component, entry, widgetData.data);
    }
  }




}
