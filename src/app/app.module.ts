import { FormComponent } from "./library/FormComponents";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";



import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { MainBannerComponent } from "./components/main-banner/main-banner.component";
import { FeaturedProductComponent } from "./components/featured-product/featured-product.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { AboutComponent } from "./pages/about/about.component";
import { ProductSliderComponent } from "./components/product-slider/product-slider.component";
import { SpacerComponent } from "./components/spacer/spacer.component";
import { GraphicContentComponent } from "./components/graphic-content/graphic-content.component";
import { HeadingComponent } from "./components/heading/heading.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { ContactFormComponent } from "./components/contact-form/contact-form.component";
import { ContactSectionComponent } from "./components/contact-section/contact-section.component";
import { SigninComponent } from "./pages/signin/signin.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { ShopComponent } from "./pages/shop/shop.component";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { FormsModule } from "@angular/forms";
import { LogoutComponent } from "./pages/logout/logout.component";
import { FormViewComponent } from "./pages/form-view/form-view.component";
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CommunicationComponent } from './pages/communication/communication.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { VendorAdminComponent } from './pages/vendor-admin/vendor-admin.component';
import { VendorAdminHeaderComponent } from './components/vendor-admin-header/vendor-admin-header.component';

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
    FormViewComponent,
    CartComponent,
    CheckoutComponent,
    CommunicationComponent,
    ProductDetailComponent,
    VendorAdminComponent,
    VendorAdminHeaderComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, BrowserAnimationsModule, NbThemeModule.forRoot({ name: 'default' }), NbLayoutModule, NbEvaIconsModule],
  providers: [FormComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
