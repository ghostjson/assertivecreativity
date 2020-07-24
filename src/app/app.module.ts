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

/** Vendor Admin module imports */
import { VendorAdminDashboardComponent } from './pages/vendor-admin-dashboard/vendor-admin-dashboard.component';
import { VendorAdminHeaderComponent } from './components/vendor-admin-header/vendor-admin-header.component';
import { MailBoxComponent } from './components/mail-box/mail-box.component';
import { VendorAdminMailComponent } from './pages/vendor-admin-mail/vendor-admin-mail.component';
import { VendorAdminProductsComponent } from './pages/vendor-admin-products/vendor-admin-products.component';
import { VendorAdminProductsListComponent } from './components/vendor-admin-products-list/vendor-admin-products-list.component';
import { VendorAdminProductComponent } from './pages/vendor-admin-product/vendor-admin-product.component';
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
import { ColorPickerModule } from 'ngx-color-picker';
import { VendorAdminAddProductFormComponent } from './components/vendor-admin-add-product-form/vendor-admin-add-product-form.component';
import { httpInterceptProvider } from './http-interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { ReadMailComponent } from './pages/read-mail/read-mail.component';
import { DisplayMailComponent } from './components/display-mail/display-mail.component';
import { SelectShopTypeComponent } from './pages/select-shop-type/select-shop-type.component';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { TreeTableModule } from 'primeng/treetable';
import { CalendarModule } from 'primeng/calendar';
import {TableModule} from 'primeng/table';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ToastModule} from 'primeng/toast';
import {ProgressBarModule} from 'primeng/progressbar';

import { ProductOptionsColorComponent } from './components/product-options-color/product-options-color.component';
import { ProductOptionsRadioBtnComponent } from './components/product-options-radio-btn/product-options-radio-btn.component';
import { ProductOptionsDropdownComponent } from './components/product-options-dropdown/product-options-dropdown.component';
import { OrderConfirmComponent } from './pages/order-confirm/order-confirm.component';
import { ProductOptionsQuestionComponent } from './components/product-options-question/product-options-question.component';
import { OrdersComponent } from './pages/orders/orders.component';


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
    VendorAdminProductFeaturesFormComponent,
    VendorAdminMailComposeComponent,
    VendorAdminMailWriterComponent,
    VendorAdminMailSidebarComponent,
    VendorAdminStatusCardComponent,
    VendorAdminFooterComponent,
    VendorAdminChartCardComponent,
    VendorAdminAddProductComponent,
    VendorAdminAddProductFormComponent,
    LoaderComponent,
    MessagesComponent,
    ReadMailComponent,
    DisplayMailComponent,
    SelectShopTypeComponent,
    ProductOptionsColorComponent,
    ProductOptionsRadioBtnComponent,
    ProductOptionsDropdownComponent,
    OrderConfirmComponent,
    ProductOptionsQuestionComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSummernoteModule,
    ChartjsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    // Prime Ng Modules
    CardModule,
    ButtonModule,
    DropdownModule,
    RadioButtonModule,
    InputTextModule,
    TreeTableModule,
    CalendarModule,
    TableModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    ToastModule,
    ProgressBarModule
  ],
  entryComponents: [
    // VendorAdminProductColorChooserComponent
  ],
  providers: [FormComponent, httpInterceptProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
