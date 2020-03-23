import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MainBannerComponent } from './components/main-banner/main-banner.component';
import { FeaturedProductComponent } from './components/featured-product/featured-product.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductSliderComponent } from './components/product-slider/product-slider.component';
import { SpacerComponent } from './components/spacer/spacer.component';
import { GraphicContentComponent } from './components/graphic-content/graphic-content.component';
import { HeadingComponent } from './components/heading/heading.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainBannerComponent,
    FeaturedProductComponent,
    FooterComponent,
    HeaderComponent,
    AboutComponent,
    ProductSliderComponent,
    SpacerComponent,
    GraphicContentComponent,
    HeadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
