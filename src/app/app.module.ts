import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/** Angular imports */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** Library imports */
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { FormComponent } from './library/FormComponents';

/** Angular cdk imports */
import { DragDropModule } from '@angular/cdk/drag-drop';

/** Primeng imports */
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { FileUploadModule } from 'primeng/fileupload';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ListboxModule } from 'primeng/listbox';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { MenubarModule } from 'primeng/menubar';
import { GalleriaModule } from 'primeng/galleria';
import { AccordionModule } from 'primeng/accordion';
import { CarouselModule } from 'primeng/carousel';
import { PaginatorModule } from 'primeng/paginator';
import { CheckboxModule } from 'primeng/checkbox';
import { TabViewModule } from 'primeng/tabview';
import { EditorModule } from 'primeng/editor';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TreeModule } from 'primeng/tree';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { AvatarModule } from 'primeng/avatar';
import { InputMaskModule } from 'primeng/inputmask';
import { StepsModule } from 'primeng/steps';
import { DataViewModule } from 'primeng/dataview';
import { ScrollTopModule } from 'primeng/scrolltop';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { ChartModule } from 'primeng/chart';
import { SlideMenuModule } from 'primeng/slidemenu';

/** Common Imports */
import { LoaderComponent } from './components/loader/loader.component';
import { httpInterceptProvider } from './helpers/http-interceptor';
import { ErrorInterceptor } from './helpers/error-interceptor/error.interceptor';
import { LimitLengthPipe } from './pipes/limit-length/limit-length.pipe';

/** Shop imports */
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
import { LogoutComponent } from './pages/logout/logout.component';
import { FormViewComponent } from './pages/form-view/form-view.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { FeaturedProductSliderComponent } from './components/featured-product-slider/featured-product-slider.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartItemDetailComponent } from './pages/cart-item-detail/cart-item-detail.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { ProductSummaryCardComponent } from './components/product-summary-card/product-summary-card.component';
import { OrderSummaryTableComponent } from './components/order-summary-table/order-summary-table.component';
import { OrderMailListComponent } from './components/order-mail-list/order-mail-list.component';
import { StockProductDetailComponent } from './pages/stock-product-detail/stock-product-detail.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';

/** Admin module imports */
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';
import { AdminProductsListComponent } from './components/admin-products-list/admin-products-list.component';
import { AdminStatusCardComponent } from './components/admin-status-card/admin-status-card.component';
import { AdminFooterComponent } from './components/admin-footer/admin-footer.component';
import { AdminChartCardComponent } from './components/admin-chart-card/admin-chart-card.component';
import { AdminFormsQuestionMakerDropdownComponent } from './components/admin-forms-question-maker-dropdown/admin-forms-question-maker-dropdown.component';
import { AdminFormsQuestionMakerRadioComponent } from './components/admin-forms-question-maker-radio/admin-forms-question-maker-radio.component';
import { AdminFormsQuestionMakerParagraphComponent } from './components/admin-forms-question-maker-paragraph/admin-forms-question-maker-paragraph.component';
import { AdminFormsQuestionMakerColorComponent } from './components/admin-forms-question-maker-color/admin-forms-question-maker-color.component';
import { AdminFormsQuestionMakerDatePickerComponent } from './components/admin-forms-question-maker-date-picker/admin-forms-question-maker-date-picker.component';
import { AdminCategorySelectorComponent } from './components/admin-category-selector/admin-category-selector.component';
import { AdminTagSelectorComponent } from './components/admin-tag-selector/admin-tag-selector.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AdminCategoryAdderComponent } from './pages/admin-category-adder/admin-category-adder.component';
import { AdminTagAdderComponent } from './pages/admin-tag-adder/admin-tag-adder.component';
import { AdminOrdersComponent } from './pages/admin-orders/admin-orders.component';
import { AdminFormsMakerComponent } from './components/admin-forms-maker/admin-forms-maker.component';
import { AdminFormsComponent } from './pages/admin-forms/admin-forms.component';
import { AdminFormsQuestionMakerComponent } from './components/admin-forms-question-maker/admin-forms-question-maker.component';
import { AdminFormsQuestionMakerChildQuestionsListComponent } from './components/admin-forms-question-maker-child-questions-list/admin-forms-question-maker-child-questions-list.component';

/** Vendor imports */
import { VendorDashboardComponent } from './pages/vendor-dashboard/vendor-dashboard.component';
import { OverlayMenuComponent } from './components/overlay-menu/overlay-menu.component';
import { AdminFormsQuestionMakerCheckboxComponent } from './components/admin-forms-question-maker-checkbox/admin-forms-question-maker-checkbox.component';
import { CustomFormQuestionRadioComponent } from './components/custom-form-question-radio/custom-form-question-radio.component';
import { CustomFormComponent } from './components/custom-form/custom-form.component';
import { CustomFormQuestionDropdownComponent } from './components/custom-form-question-dropdown/custom-form-question-dropdown.component';
import { CustomFormQuestionColorComponent } from './components/custom-form-question-color/custom-form-question-color.component';
import { CustomFormQuestionCheckboxComponent } from './components/custom-form-question-checkbox/custom-form-question-checkbox.component';
import { CustomFormQuestionParagraphComponent } from './components/custom-form-question-paragraph/custom-form-question-paragraph.component';
import { CustomFormQuestionDatePickerComponent } from './components/custom-form-question-date-picker/custom-form-question-date-picker.component';
import { CustomFormSectionComponent } from './components/custom-form-section/custom-form-section.component';
import { CustomFormQuestionComponent } from './components/custom-form-question/custom-form-question.component';
import { AdminFormsQuestionMakerFileComponent } from './components/admin-forms-question-maker-file/admin-forms-question-maker-file.component';
import { CustomFormQuestionFileComponent } from './components/custom-form-question-file/custom-form-question-file.component';
import { CategoryDropdownComponent } from './components/category-dropdown/category-dropdown.component';
import { AdminCustomProductCrudComponent } from './pages/admin-custom-product-crud/admin-custom-product-crud.component';
import { CustomProductImagePreviewComponent } from './components/custom-product-image-preview/custom-product-image-preview.component';
import { AdminCustomProductCrudFormComponent } from './components/admin-custom-product-crud-form/admin-custom-product-crud-form.component';
import { AdminCustomProductCrudFormBasicDetailsComponent } from './components/admin-custom-product-crud-form-basic-details/admin-custom-product-crud-form-basic-details.component';
import { AdminCustomProductCrudFormProductImageComponent } from './components/admin-custom-product-crud-form-product-image/admin-custom-product-crud-form-product-image.component';
import { ImagePickerFormComponent } from './components/image-picker-form/image-picker-form.component';
import { AdminCustomProductCrudFormPricingComponent } from './components/admin-custom-product-crud-form-pricing/admin-custom-product-crud-form-pricing.component';
import { AdminCustomProductCrudFormInventoryMgmntComponent } from './components/admin-custom-product-crud-form-inventory-mgmnt/admin-custom-product-crud-form-inventory-mgmnt.component';
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
    AdminDashboardComponent,
    AdminProductsComponent,
    AdminProductsListComponent,
    AdminStatusCardComponent,
    AdminFooterComponent,
    AdminChartCardComponent,
    LoaderComponent,
    OrdersComponent,
    AdminCategorySelectorComponent,
    AdminTagSelectorComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminNavbarComponent,
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
    VendorDashboardComponent,
    StockProductDetailComponent,
    LimitLengthPipe,
    AdminFormsComponent,
    AdminFormsMakerComponent,
    AdminFormsQuestionMakerComponent,
    AdminFormsQuestionMakerDropdownComponent,
    AdminFormsQuestionMakerRadioComponent,
    AdminFormsQuestionMakerParagraphComponent,
    AdminFormsQuestionMakerColorComponent,
    AdminFormsQuestionMakerDatePickerComponent,
    AdminFormsQuestionMakerChildQuestionsListComponent,
    OverlayMenuComponent,
    AdminFormsQuestionMakerCheckboxComponent,
    CustomFormQuestionRadioComponent,
    CustomFormComponent,
    CustomFormQuestionDropdownComponent,
    CustomFormQuestionColorComponent,
    CustomFormQuestionCheckboxComponent,
    CustomFormQuestionParagraphComponent,
    CustomFormQuestionDatePickerComponent,
    CustomFormSectionComponent,
    CustomFormQuestionComponent,
    AdminFormsQuestionMakerFileComponent,
    CustomFormQuestionFileComponent,
    CategoryDropdownComponent,
    AdminCustomProductCrudComponent,
    CustomProductImagePreviewComponent,
    AdminCustomProductCrudFormComponent,
    AdminCustomProductCrudFormBasicDetailsComponent,
    AdminCustomProductCrudFormProductImageComponent,
    ImagePickerFormComponent,
    AdminCustomProductCrudFormPricingComponent,
    AdminCustomProductCrudFormInventoryMgmntComponent,
  ],
  imports: [
    /** Angular modules */
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    /** Library modules */
    NgxPageScrollModule,

    /** Angular cdk modules */
    DragDropModule,

    /** Prime Ng Modules */
    CardModule,
    ButtonModule,
    DropdownModule,
    RadioButtonModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    TableModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
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
    SelectButtonModule,
    ProgressSpinnerModule,
    BlockUIModule,
    AvatarModule,
    RippleModule,
    InputMaskModule,
    StepsModule,
    DataViewModule,
    ScrollTopModule,
    TooltipModule,
    ChartModule,
    SlideMenuModule,
  ],
  providers: [
    FormComponent,
    httpInterceptProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
