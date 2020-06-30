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

/** Vendor Admin module imports */
import { VendorAdminDashboardComponent } from './pages/vendor-admin-dashboard/vendor-admin-dashboard.component';
import { VendorAdminHeaderComponent } from './components/vendor-admin-header/vendor-admin-header.component';
import { MailBoxComponent } from './components/mail-box/mail-box.component';
import { VendorAdminMailComponent } from './pages/vendor-admin-mail/vendor-admin-mail.component';
import { VendorAdminProductsComponent } from './pages/vendor-admin-products/vendor-admin-products.component';
import { VendorAdminProductsListComponent } from './components/vendor-admin-products-list/vendor-admin-products-list.component';
import { VendorAdminProductComponent } from './pages/vendor-admin-product/vendor-admin-product.component';
import { VendorAdminProductImageComponent } from './components/vendor-admin-product-image/vendor-admin-product-image.component';
import { VendorAdminProductDetailsFormComponent } from './components/vendor-admin-product-details-form/vendor-admin-product-details-form.component';
import { VendorAdminProductFeaturesFormComponent } from './components/vendor-admin-product-features-form/vendor-admin-product-features-form.component';
import { NgxSummernoteModule } from 'ngx-summernote';
import { VendorAdminMailComposeComponent } from './pages/vendor-admin-mail-compose/vendor-admin-mail-compose.component';
import { VendorAdminMailWriterComponent } from './components/vendor-admin-mail-writer/vendor-admin-mail-writer.component';
import { VendorAdminMailSidebarComponent } from './components/vendor-admin-mail-sidebar/vendor-admin-mail-sidebar.component';
import { VendorAdminStatusCardComponent } from './components/vendor-admin-status-card/vendor-admin-status-card.component';
import { ChartjsModule } from '@ctrl/ngx-chartjs';
import { VendorAdminFooterComponent } from './components/vendor-admin-footer/vendor-admin-footer.component';
import { VendorAdminChartCardComponent } from './components/vendor-admin-chart-card/vendor-admin-chart-card.component';
import { VendorAdminAddProductComponent } from './pages/vendor-admin-add-product/vendor-admin-add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VendorAdminProductColorChooserComponent } from './components/vendor-admin-product-color-chooser/vendor-admin-product-color-chooser.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { VendorAdminColorChooserDirective } from './directives/vendor-admin-color-chooser.directive';

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
    VendorAdminDashboardComponent,
    VendorAdminHeaderComponent,
    MailBoxComponent,
    VendorAdminMailComponent,
    VendorAdminProductsComponent,
    VendorAdminProductsListComponent,
    VendorAdminProductComponent,
    VendorAdminProductImageComponent,
    VendorAdminProductDetailsFormComponent,
    VendorAdminProductFeaturesFormComponent,
    VendorAdminMailComposeComponent,
    VendorAdminMailWriterComponent,
    VendorAdminMailSidebarComponent,
    VendorAdminStatusCardComponent,
    VendorAdminFooterComponent,
    VendorAdminChartCardComponent,
    VendorAdminAddProductComponent,
    VendorAdminProductColorChooserComponent,
    VendorAdminColorChooserDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NgxSummernoteModule,
    ChartjsModule,
    ReactiveFormsModule,
    ColorPickerModule
  ],
  entryComponents: [
    VendorAdminProductColorChooserComponent
  ],
  providers: [FormComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
