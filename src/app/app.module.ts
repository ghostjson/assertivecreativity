import { FormComponent } from "./library/FormComponents";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

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
import { CartComponent } from "./pages/cart/cart.component";
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

/**Custom Pipes */

/** Admin module imports */
import { AdminDashboardComponent } from "./pages/admin-dashboard/admin-dashboard.component";
import { AdminProductsComponent } from "./pages/admin-products/admin-products.component";
import { AdminProductsListComponent } from "./components/admin-products-list/admin-products-list.component";
import { AdminStatusCardComponent } from "./components/admin-status-card/admin-status-card.component";
import { ChartjsModule } from "@ctrl/ngx-chartjs";
import { AdminFooterComponent } from "./components/admin-footer/admin-footer.component";
import { AdminChartCardComponent } from "./components/admin-chart-card/admin-chart-card.component";
import { AdminAddProductComponent } from "./pages/admin-add-product/admin-add-product.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminAddProductFormComponent } from "./components/admin-add-product-form/admin-add-product-form.component";
import { httpInterceptProvider } from "./helpers/http-interceptor";
import { LoaderComponent } from "./components/loader/loader.component";

import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { TreeTableModule } from "primeng/treetable";
import { CalendarModule } from "primeng/calendar";
import { TableModule } from "primeng/table";
import { SliderModule } from "primeng/slider";
import { DialogModule } from "primeng/dialog";
import { MultiSelectModule } from "primeng/multiselect";
import { ContextMenuModule } from "primeng/contextmenu";
import { ToastModule } from "primeng/toast";
import { ProgressBarModule } from "primeng/progressbar";
import { FileUploadModule } from "primeng/fileupload";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { ListboxModule } from "primeng/listbox";
import { ColorPickerModule } from "ngx-color-picker";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { InputNumberModule } from "primeng/inputnumber";
import { ToolbarModule } from "primeng/toolbar";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { SidebarModule } from "primeng/sidebar";
import { MenubarModule } from "primeng/menubar";
import { GalleriaModule } from "primeng/galleria";
import { AccordionModule } from "primeng/accordion";
import { CarouselModule } from "primeng/carousel";
import { PaginatorModule } from "primeng/paginator";
import { CheckboxModule } from "primeng/checkbox";
import { TabViewModule } from "primeng/tabview";
import { EditorModule } from "primeng/editor";
import { MenuModule } from "primeng/menu";
import { PanelMenuModule } from "primeng/panelmenu";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { TreeModule } from "primeng/tree";

import { ProductOptionsColorComponent } from "./components/product-options-color/product-options-color.component";
import { ProductOptionsRadioBtnComponent } from "./components/product-options-radio-btn/product-options-radio-btn.component";
import { ProductOptionsDropdownComponent } from "./components/product-options-dropdown/product-options-dropdown.component";
import { ProductOptionsQuestionComponent } from "./components/product-options-question/product-options-question.component";
import { OrdersComponent } from "./pages/orders/orders.component";
import { AdminCustomFormComponent } from "./components/admin-custom-form/admin-custom-form.component";
import { AdminCategorySelectorComponent } from "./components/admin-category-selector/admin-category-selector.component";
import { AdminColorOptionMakerComponent } from "./components/admin-color-option-maker/admin-color-option-maker.component";
import { AdminDropdownOptionMakerComponent } from "./components/admin-dropdown-option-maker/admin-dropdown-option-maker.component";
import { AdminRadiobtnOptionMakerComponent } from "./components/admin-radiobtn-option-maker/admin-radiobtn-option-maker.component";
import { AdminFormOptionsComponent } from "./components/admin-form-options/admin-form-options.component";
import { AdminTagSelectorComponent } from "./components/admin-tag-selector/admin-tag-selector.component";
import { AdminTextOptionMakerComponent } from "./components/admin-text-option-maker/admin-text-option-maker.component";
import { AdminProductEditComponent } from "./pages/admin-product-edit/admin-product-edit.component";
import { AdminPriceTableInputComponent } from "./components/admin-price-table-input/admin-price-table-input.component";
import { InputSwitchModule } from "primeng/inputswitch";
import { SplitButtonModule } from "primeng/splitbutton";
import { AdminHeaderComponent } from "./components/admin-header/admin-header.component";
import { AdminSidebarComponent } from "./components/admin-sidebar/admin-sidebar.component";
import { AdminNavbarComponent } from "./components/admin-navbar/admin-navbar.component";
import { ProductOptionsComponent } from "./components/product-options/product-options.component";
import { AdminCategoryAdderComponent } from "./pages/admin-category-adder/admin-category-adder.component";
import { AdminTagAdderComponent } from "./pages/admin-tag-adder/admin-tag-adder.component";
import { FeaturedProductSliderComponent } from "./components/featured-product-slider/featured-product-slider.component";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { CartItemDetailComponent } from "./pages/cart-item-detail/cart-item-detail.component";
import { OrderDetailComponent } from "./pages/order-detail/order-detail.component";
import { ProductSummaryCardComponent } from "./components/product-summary-card/product-summary-card.component";
import { OrderSummaryTableComponent } from "./components/order-summary-table/order-summary-table.component";
import { OrderMailListComponent } from "./components/order-mail-list/order-mail-list.component";
import { AdminOrdersComponent } from "./pages/admin-orders/admin-orders.component";
import { OrdersListComponent } from "./components/orders-list/orders-list.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ErrorInterceptor } from "./helpers/error-interceptor/error.interceptor";
import { VendorDashboardComponent } from './pages/vendor-dashboard/vendor-dashboard.component';
import { OrderMailFormMakerComponent } from './components/order-mail-form-maker/order-mail-form-maker.component';
import { OrderMailFormMakerDropdownComponent } from './components/order-mail-form-maker-dropdown/order-mail-form-maker-dropdown.component';
import { OrderMailFormMakerRadioComponent } from './components/order-mail-form-maker-radio/order-mail-form-maker-radio.component';
import { OrderMailFormMakerTextComponent } from './components/order-mail-form-maker-text/order-mail-form-maker-text.component';
import { OrderMailFormMakerColorComponent } from './components/order-mail-form-maker-color/order-mail-form-maker-color.component';

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
    ProductDetailComponent,
    AdminDashboardComponent,
    AdminProductsComponent,
    AdminProductsListComponent,
    AdminStatusCardComponent,
    AdminFooterComponent,
    AdminChartCardComponent,
    AdminAddProductComponent,
    AdminAddProductFormComponent,
    LoaderComponent,
    ProductOptionsColorComponent,
    ProductOptionsRadioBtnComponent,
    ProductOptionsDropdownComponent,
    ProductOptionsQuestionComponent,
    OrdersComponent,
    AdminCustomFormComponent,
    AdminCategorySelectorComponent,
    AdminColorOptionMakerComponent,
    AdminDropdownOptionMakerComponent,
    AdminRadiobtnOptionMakerComponent,
    AdminFormOptionsComponent,
    AdminTagSelectorComponent,
    AdminTextOptionMakerComponent,
    AdminProductEditComponent,
    AdminPriceTableInputComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminNavbarComponent,
    ProductOptionsComponent,
    AdminCategoryAdderComponent,
    AdminTagAdderComponent,
    FeaturedProductSliderComponent,
    ProductCardComponent,
    CartItemDetailComponent,
    OrderDetailComponent,
    ProductSummaryCardComponent,
    OrderSummaryTableComponent,
    OrderMailListComponent,
    AdminOrdersComponent,
    OrdersListComponent,
    NavbarComponent,
    VendorDashboardComponent,
    OrderMailFormMakerComponent,
    OrderMailFormMakerDropdownComponent,
    OrderMailFormMakerRadioComponent,
    OrderMailFormMakerTextComponent,
    OrderMailFormMakerColorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartjsModule,
    ReactiveFormsModule,
    // Prime Ng Modules
    ColorPickerModule,
    CardModule,
    ButtonModule,
    DropdownModule,
    RadioButtonModule,
    InputTextModule,
    InputTextareaModule,
    TreeTableModule,
    CalendarModule,
    TableModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    ToastModule,
    ProgressBarModule,
    FileUploadModule,
    OverlayPanelModule,
    ListboxModule,
    MessagesModule,
    MessageModule,
    InputNumberModule,
    InputSwitchModule,
    ToolbarModule,
    ConfirmDialogModule,
    SplitButtonModule,
    SidebarModule,
    MenubarModule,
    GalleriaModule,
    AccordionModule,
    CarouselModule,
    PaginatorModule,
    CheckboxModule,
    TabViewModule,
    EditorModule,
    MenuModule,
    PanelMenuModule,
    ScrollPanelModule,
    TreeModule,
  ],
  entryComponents: [],
  providers: [
    FormComponent, 
    httpInterceptProvider, 
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
