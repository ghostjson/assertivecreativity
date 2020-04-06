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
import { ContactComponent } from './pages/contact/contact.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ShopComponent } from './pages/shop/shop.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from './pages/logout/logout.component';

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
    HeadingComponent,
    ContactComponent,
    ContactFormComponent,
    ContactSectionComponent,
    SigninComponent,
    SignupComponent,
    ShopComponent,
    UserProfileComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
